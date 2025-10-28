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
      // Dynamically import all .md files from the subject's folder
      const mdFiles = import.meta.glob('../data/md_files/**/*.md', { 
        query: '?raw',
        import: 'default',
        eager: false 
      });

      // Filter files for the specific subject folder
      const subjectFiles = Object.keys(mdFiles).filter(path => 
        path.includes(`/md_files/${folderName}/`)
      );

      if (subjectFiles.length === 0) {
        console.warn(`No markdown files found for ${subjectId}, using defaults`);
        return getDefaultMaterials(subjectId);
      }

      // Load each markdown file
      const materials = await Promise.all(
        subjectFiles.map(async (filePath, index) => {
          const content = await mdFiles[filePath]();
          // Extract filename without extension for the title
          const fileName = filePath.split('/').pop().replace('.md', '');
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
      return getDefaultMaterials(subjectId);
    }
  } catch (error) {
    console.error('Error in loadReviewMaterials:', error);
    return [];
  }
};

/**
 * Fallback function to get default materials when markdown files are not available
 * @param {string} subjectId - The ID of the subject
 * @returns {Array} - Array of default material objects
 */
const getDefaultMaterials = (subjectId) => {
  let materials = [];

  if (subjectId === 'softeng-2') {
      materials = [
        { 
          id: 'softeng-2-1', 
          title: "Requirements Engineering", 
          content: `# Requirements Engineering

## Introduction to Requirements Engineering

Requirements Engineering is the process of defining, documenting, and maintaining requirements in the engineering design process. It's a critical component of software engineering that focuses on establishing what the stakeholders need from a system and what the system must do to satisfy those needs.

### Key Activities in Requirements Engineering

1. **Elicitation**: Gathering requirements from stakeholders through interviews, surveys, and observation
2. **Analysis**: Evaluating requirements for conflicts, overlaps, omissions, and ambiguities
3. **Specification**: Documenting requirements in a structured format
4. **Validation**: Ensuring requirements truly represent stakeholder needs
5. **Management**: Tracking and controlling changes to requirements

## Functional vs Non-Functional Requirements

Requirements can be categorized into two main types:

### Functional Requirements
- Define what the system should do
- Describe behaviors and functions
- Usually expressed as "The system shall..."
- Examples: authentication features, data processing rules, business logic

### Non-Functional Requirements (Quality Attributes)
- Define how the system should be
- Describe qualities and constraints
- Categories include:
  - Performance
  - Security
  - Usability
  - Reliability
  - Maintainability

## Requirements Documentation

Good requirements documentation should be:

- Clear and unambiguous
- Complete
- Consistent
- Verifiable
- Traceable
- Prioritized

## Best Practices

- Involve stakeholders throughout the process
- Use appropriate techniques for elicitation
- Document assumptions and constraints
- Establish a change management process
- Validate requirements with stakeholders
- Maintain traceability between requirements and design elements` 
        },
        { 
          id: 'softeng-2-2', 
          title: "System Boundaries & Context", 
          content: `# System Boundaries & Context

## Understanding System Boundaries

A system boundary defines the scope of a system by separating elements that belong to the system from those in the external environment. Properly defining boundaries is crucial for:

- Determining what's in and out of scope
- Identifying external interfaces
- Allocating responsibilities
- Managing project complexity

### Types of Boundaries

1. **Functional boundary**: Separates system functions from external functions
2. **Organizational boundary**: Delineates responsibilities between different stakeholders
3. **Physical boundary**: Defines the physical perimeter of the system

## Context Modeling

Context modeling helps understand the environment in which a system operates:

### System Context Diagram
- Shows the system as a single entity
- Identifies external entities that interact with the system
- Illustrates data flows between the system and external entities

### Benefits of Clear Context Definition
- Focuses the development effort
- Clarifies interfaces and dependencies
- Reduces scope creep
- Helps identify stakeholders

## Interface Definition

Interfaces between the system and external entities must be clearly defined:

- **Data exchanges**: What information flows in and out
- **Protocols**: How communication occurs
- **Constraints**: Limitations on the interface
- **Assumptions**: Expected behaviors from external systems

## Common Challenges

- Ambiguous boundaries leading to scope creep
- Missing external dependencies
- Incorrectly allocating responsibilities
- Overlooking important stakeholders
- Inadequate interface specifications

## Best Practices

- Involve stakeholders in boundary definition
- Document boundary decisions and rationales
- Regularly review and validate boundaries
- Be explicit about what is excluded from scope
- Define interfaces with precision` 
        },
        { 
          id: 'softeng-2-3', 
          title: "UML Diagrams", 
          content: `# UML Diagrams in Software Engineering

## Introduction to UML

Unified Modeling Language (UML) is a standardized modeling language used in software engineering to provide a visual representation of a system's architecture, design, and behavior.

## Key UML Diagram Types

### Structural Diagrams

These diagrams show the static structure of a system:

#### Class Diagram
- Depicts classes, their attributes, operations, and relationships
- Shows inheritance, associations, aggregations, and compositions
- Primary tool for object-oriented design

#### Component Diagram
- Shows how components are wired together
- Focuses on interfaces and dependencies
- Useful for architectural design

#### Deployment Diagram
- Illustrates the physical deployment of artifacts to nodes
- Shows runtime processing elements and components
- Helps plan system infrastructure

### Behavioral Diagrams

These diagrams show the dynamic behavior of the system:

#### Use Case Diagram
- Captures system functionality from the user's perspective
- Shows actors, use cases, and relationships
- Useful for requirements analysis

#### Sequence Diagram
- Shows interaction between objects in a time-ordered sequence
- Illustrates message exchanges between components
- Helpful for detailed design of specific scenarios

#### Activity Diagram
- Represents workflows and business processes
- Shows control flow from activity to activity
- Useful for modeling complex business logic

#### State Machine Diagram
- Depicts states an object goes through during its lifecycle
- Shows transitions between states based on events
- Used for modeling reactive systems

## Best Practices for UML Usage

- Keep diagrams focused on specific aspects
- Maintain consistent level of detail
- Include only relevant information
- Use standard notation
- Maintain traceability to requirements
- Update models as design evolves`
        }
      ];
    } else if (subjectId === 'cs-elective-3') {
      materials = [
        { 
          id: 'cs-elective-3-1', 
          title: "Introduction to AI", 
          content: `# Introduction to Artificial Intelligence

## Historical Development of AI

Artificial Intelligence has evolved significantly since its conceptual beginnings:

### Early Foundations (1940s-1950s)
- **1943**: McCulloch & Pitts develop the first mathematical model of a neural network
- **1950**: Alan Turing publishes "Computing Machinery and Intelligence," proposing the Turing Test
- **1956**: The Dartmouth Conference officially coins the term "Artificial Intelligence"

### Classical Period (1960s-1970s)
- Development of first expert systems
- Early natural language processing systems
- Logic-based approaches to problem solving
- Initial research in computer vision

### AI Winter and Revival (1980s-1990s)
- Funding cuts due to unmet expectations
- Revival through expert systems in industry
- Development of probabilistic methods
- Increased focus on machine learning

### Modern AI (2000s-Present)
- Dramatic improvements in computational power
- Big data availability enabling training of complex models
- Deep learning breakthroughs
- Integration of AI into consumer applications

## Core Concepts in AI

### Intelligence
- Problem-solving capabilities
- Learning from experience
- Adapting to new situations
- Understanding complex concepts

### Types of AI
- **Narrow AI**: Specialized in a specific task
- **General AI**: Human-level intelligence across domains
- **Super AI**: Intelligence that surpasses human abilities

### AI Approaches
- **Symbolic AI**: Rule-based manipulation of symbols
- **Sub-symbolic AI**: Statistical and numerical processing
- **Hybrid approaches**: Combining multiple techniques

## Applications of AI

- **Healthcare**: Diagnosis, drug discovery, patient monitoring
- **Finance**: Fraud detection, algorithmic trading
- **Transportation**: Autonomous vehicles, traffic optimization
- **Entertainment**: Game AI, content recommendation
- **Business**: Customer service, process automation

## Ethical Considerations

- Privacy concerns
- Job displacement
- Decision transparency
- Bias and fairness
- Safety and security
- Control and autonomy`
        },
        { 
          id: 'cs-elective-3-2', 
          title: "Search Algorithms in AI", 
          content: `# Search Algorithms in Artificial Intelligence

## Fundamental Search Concepts

Search algorithms in AI are methods for finding solutions to problems by exploring different states and paths. They are essential building blocks for many AI applications.

### Search Problem Components
- **States**: Configurations of the problem
- **Initial state**: The starting point
- **Goal test**: Determines if a state is a solution
- **Actions**: Operations that transition between states
- **Path cost**: Measure of resource usage

## Uninformed Search Strategies

These algorithms don't use problem-specific knowledge beyond the problem definition:

### Breadth-First Search (BFS)
- Expands shallowest unexplored nodes first
- Guarantees optimal solution if step costs are identical
- Space complexity is a major limitation
- Complete: Will find a solution if one exists

### Depth-First Search (DFS)
- Expands deepest unexplored nodes first
- Lower memory requirements than BFS
- May get stuck in infinite paths without depth limit
- Not guaranteed to find optimal solution

### Uniform-Cost Search
- Expands nodes in order of path cost
- Optimal when path costs are non-negative
- Similar to Dijkstra's algorithm
- Can be inefficient with large search spaces

## Informed Search Strategies

These algorithms use heuristics to guide the search:

### A* Search
- Combines path cost and heuristic estimate
- Optimal if heuristic is admissible (never overestimates)
- Widely used in pathfinding applications
- Formula: f(n) = g(n) + h(n)

### Greedy Best-First Search
- Expands nodes based solely on heuristic value
- Not guaranteed to be optimal
- Often faster than A* but less accurate
- Works well when heuristic is informative

## Local Search Algorithms

Focus on current state rather than paths:

### Hill Climbing
- Moves to neighboring state with best value
- Can get stuck in local maxima
- Variants include steepest ascent and stochastic hill climbing

### Simulated Annealing
- Probabilistically accepts worse moves to escape local optima
- Inspired by metallurgical annealing process
- Convergence controlled by "temperature" parameter

### Genetic Algorithms
- Population-based search using evolutionary principles
- Selection, crossover, and mutation operations
- Good for complex, multi-dimensional spaces
- No guarantee of optimality`
        },
        { 
          id: 'cs-elective-3-3', 
          title: "Neural Networks", 
          content: `# Neural Networks in Artificial Intelligence

## Foundations of Neural Networks

Neural networks are computational models inspired by the human brain's structure and function, designed to recognize patterns and solve complex problems.

### Biological Inspiration

- **Neurons**: Basic processing units in the brain
- **Synapses**: Connections between neurons
- **Neural Pathways**: Networks formed by connected neurons

## Basic Components

### Artificial Neuron (Perceptron)
- **Inputs**: Values from previous layer or data
- **Weights**: Connection strengths that can be adjusted
- **Bias**: Additional parameter for flexibility
- **Activation Function**: Non-linear transformation of weighted sum
- **Output**: Result passed to the next layer

### Common Activation Functions
- **Sigmoid**: Output between 0 and 1
- **Tanh**: Output between -1 and 1
- **ReLU**: Returns x if x > 0, else 0
- **Softmax**: Converts outputs to probability distribution

## Network Architectures

### Feedforward Neural Networks
- Simplest form of neural networks
- Information flows in one direction
- No feedback loops
- Suitable for classification and regression

### Convolutional Neural Networks (CNNs)
- Specialized for processing grid-like data (e.g., images)
- Uses convolutional layers to detect features
- Incorporates pooling for dimensionality reduction
- Highly effective for image recognition tasks

### Recurrent Neural Networks (RNNs)
- Contains feedback loops for processing sequences
- Maintains memory of previous inputs
- Suitable for time series, text, speech
- Variants include LSTM and GRU to handle long-term dependencies

## Training Neural Networks

### Backpropagation
- Algorithm for calculating gradients
- Propagates error backwards through network
- Enables weight adjustment for learning

### Gradient Descent
- Iteratively adjusts weights to minimize error
- Learning rate controls step size
- Variants include stochastic and mini-batch approaches

### Common Challenges
- **Overfitting**: Model learns noise in training data
- **Vanishing/Exploding Gradients**: Issues with gradient flow
- **Local Minima**: Getting stuck in suboptimal solutions

## Applications

- Image and speech recognition
- Natural language processing
- Game playing (e.g., AlphaGo)
- Recommendation systems
- Anomaly detection
- Medical diagnosis`
        }
      ];
    } else {
      // Default materials for any other subject
      materials = [
        { 
          id: `${subjectId}-1`, 
          title: "Introduction", 
          content: `# Introduction

This is the introduction to the subject. It covers the basic concepts and principles.

## Key Points

- Point 1: Important concept
- Point 2: Another crucial idea
- Point 3: Foundational principle

### Subsection

More detailed information goes here...`
        },
        { 
          id: `${subjectId}-2`, 
          title: "Core Concepts", 
          content: `# Core Concepts

This chapter covers the core concepts of the subject.

## Main Theories

1. Theory One: Explanation of the first theory
2. Theory Two: Details about the second theory
3. Theory Three: Information about the third theory

### Examples

\`\`\`
Example code or formula can go here
\`\`\``
        },
        { 
          id: `${subjectId}-3`, 
          title: "Advanced Topics", 
          content: `# Advanced Topics

This section delves into more complex aspects of the subject.

## Complex Ideas

- Advanced concept 1
- Advanced concept 2
- Advanced concept 3

### Case Studies

Real-world applications and examples are discussed here.`
        }
      ];
    }
    
    return materials;
};

/**
 * Creates a fallback material when no questions are available
 * @param {string} topic - The topic name
 * @returns {string} - Formatted markdown string
 */
export const createFallbackMaterial = (topic) => {
  return `# ${topic}\n\n## Coming Soon\n\nReview materials for this topic are being prepared and will be available soon.\n\n### Study Tips\n\n- Review your class notes on this topic\n- Check the recommended textbooks\n- Form a study group with classmates\n- Practice with past exams if available`;
};