/**
 * Utility functions for loading and processing review content
 */

/**
 * Loads markdown files from the md_files directory
 * @param {string} subjectId - The ID of the subject to load content for
 * @returns {Promise<Array>} - Promise that resolves to an array of material objects
 */
export const loadReviewMaterials = async (subjectId) => {
  try {
    // Map subject IDs to their folder names in md_files
    const subjectFolderMap = {
      'ethics': 'ethics',
      'softeng-2': 'softeng-2',
      'cs-elective-3': 'elective3',
      'social-issues': 'soci'
    };

    const folderName = subjectFolderMap[subjectId];
    
    if (!folderName) {
      console.warn(`No markdown folder mapping found for subject: ${subjectId}`);
      return getDefaultMaterials(subjectId);
    }

    try {
      // Dynamically import all .mdx files as raw text from the subject's folder
      const mdxFiles = import.meta.glob('../data/md_files/**/*.mdx', { 
        query: '?raw',
        import: 'default',
        eager: false 
      });

      // Filter files for the specific subject folder
      const subjectFiles = Object.keys(mdxFiles).filter(path => 
        path.includes(`/md_files/${folderName}/`)
      );

      if (subjectFiles.length === 0) {
        console.warn(`No markdown files found for ${subjectId}`);
        return [{
          id: 1,
          title: "No Content Available",
          content: `# ${subjectId.toUpperCase()} - No Content Available\n\n> **Note:** This subject currently has no review materials.\n\nPlease check back later or contact your instructor for study materials.`
        }];
      }

      // Load each markdown file
      const materials = await Promise.all(
        subjectFiles.map(async (filePath, index) => {
          const content = await mdxFiles[filePath]();
          // Extract filename without extension for the title
          const fileName = filePath.split('/').pop().replace('.mdx', '');
          const title = fileName
            .split(/[-_]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          return {
            id: index + 1,
            title: title,
            content: content
          };
        })
      );

      return materials.sort((a, b) => a.title.localeCompare(b.title));
    } catch (error) {
      console.error(`Error loading markdown files for ${subjectId}:`, error);
      return [{
        id: 1,
        title: "Error Loading Content",
        content: `# Error Loading Content\n\n> **Error:** Unable to load review materials for this subject.\n\nPlease refresh the page or contact support if the issue persists.`
      }];
    }
  } catch (error) {
    console.error('Error in loadReviewMaterials:', error);
    return [{
      id: 1,
      title: "Error Loading Content",
      content: `# Error Loading Content\n\n> **Error:** An unexpected error occurred.\n\nPlease refresh the page or contact support.`
    }];
  }
};

/**
 * Creates a fallback material when no questions are available
 * @param {string} topic - The topic name
 * @returns {string} - Formatted markdown string
 */
export const createFallbackMaterial = (topic) => {
  return `# ${topic}\n\n## Coming Soon\n\nReview materials for this topic are being prepared and will be available soon.\n\n### Study Tips\n\n- Review your class notes on this topic\n- Check the recommended textbooks\n- Form a study group with classmates\n- Practice with past exams if available`;
};