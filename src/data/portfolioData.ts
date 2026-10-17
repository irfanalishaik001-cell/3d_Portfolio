import { WhiteboardNode } from '../utils/whiteboard';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: 'AI / ML' | 'Full-Stack' | 'Creative';
  featured: boolean;
  image: string;
  problem: string;
  solution: string;
  technologies: string[];
  contributions: string[];
  metrics?: string;
  recognition?: string;
  githubUrl?: string;
  liveUrl?: string;
  details?: string;
}

export interface ResourceLink {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  icon: string;
  badge: string;
}

export interface InternshipData {
  studentName: string;
  stream: string;
  branch: string;
  institute: string;
  domain: string;
  duration: string;
  programTitle: string;
  refNo: string;
  aicteStudentId: string;
  status: string;
  statusNote: string;
  curriculum: Array<{
    week: number;
    module: string;
    description: string;
    skills: string[];
  }>;
}

export const PERSONAL_INFO = {
  name: 'Irfan Ali Shaik',
  shortName: 'Irfan',
  title: 'Undergraduate B.Tech Student in Artificial Intelligence & Machine Learning',
  roleSummary: 'Aspiring Software Engineer & AI/ML Developer',
  college: 'Sagi Ramakrishnam Raju Engineering College (SRKR)',
  location: 'Andhra Pradesh, India',
  email: 'bj226367@gmail.com',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/in/',
  leetcode: 'https://leetcode.com/',
  availableForWork: true,
  availabilityText: 'Available for Summer & Fall 2026 Internships',
  bioHeadline: 'Building with Code. Exploring with AI. Creating with Purpose.',
  bioParagraph1:
    'I am a B.Tech student specializing in Artificial Intelligence and Machine Learning at Sagi Ramakrishnam Raju Engineering College. My work sits at the intersection of robust algorithmic fundamentals, applied machine learning pipelines, and responsive software design.',
  bioParagraph2:
    'From building predictive agricultural supply-chain platforms like FarmDirect AI to fine-tuning NLP classification models and editing cinematic video content, I bring a disciplined engineering mindset paired with creative problem solving.',
};

export const INITIAL_WHITEBOARD_NODES: WhiteboardNode[] = [
  // Programming Cluster (Left)
  {
    id: 'python',
    name: 'Python',
    category: 'programming',
    proficiency: 'Proficient',
    x: 40,
    y: 80,
    icon: 'python',
    color: '#3776AB',
    accentBg: '#EFF6FF',
    description: 'Primary language for data science, machine learning models, scripts, and algorithmic problem-solving.',
    docUrl: 'https://www.python.org/',
    relatedIds: ['numpy', 'pandas', 'scikit-learn', 'dsa'],
    tag: 'Core Driver',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'programming',
    proficiency: 'Working Knowledge',
    x: 50,
    y: 220,
    icon: 'java',
    color: '#E76F00',
    accentBg: '#FFF7ED',
    description: 'Object-oriented programming, enterprise software architectures, and rigorous DSA practice.',
    docUrl: 'https://dev.java/',
    relatedIds: ['oop', 'dsa'],
    tag: 'OOP Foundation',
  },
  {
    id: 'c-lang',
    name: 'C Language',
    category: 'programming',
    proficiency: 'Working Knowledge',
    x: 40,
    y: 350,
    icon: 'c',
    color: '#00599C',
    accentBg: '#F0F9FF',
    description: 'Low-level memory management, pointers, and foundational computer architecture understanding.',
    docUrl: 'https://en.cppreference.com/w/c',
    relatedIds: ['dsa'],
  },

  // AI & ML Cluster (Center - Top)
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'aiml',
    proficiency: 'Proficient',
    x: 270,
    y: 60,
    icon: 'numpy',
    color: '#013243',
    accentBg: '#F8FAFC',
    description: 'N-dimensional array operations, matrix linear algebra, broadcasting, and numerical optimizations.',
    docUrl: 'https://numpy.org/',
    relatedIds: ['python', 'pandas', 'scikit-learn'],
    tag: 'Math Backbone',
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'aiml',
    proficiency: 'Proficient',
    x: 450,
    y: 60,
    icon: 'pandas',
    color: '#150458',
    accentBg: '#FAF5FF',
    description: 'Data manipulation, time-series analysis, ETL cleaning pipelines, and DataFrame restructuring.',
    docUrl: 'https://pandas.pydata.org/',
    relatedIds: ['numpy', 'scikit-learn', 'matplotlib'],
  },
  {
    id: 'matplotlib',
    name: 'Matplotlib & Seaborn',
    category: 'aiml',
    proficiency: 'Proficient',
    x: 640,
    y: 70,
    icon: 'chart',
    color: '#11557C',
    accentBg: '#F0FDF4',
    description: 'Exploratory data analysis, statistical distributions, correlation heatmaps, and publication-ready charts.',
    docUrl: 'https://matplotlib.org/',
    relatedIds: ['pandas', 'scikit-learn'],
  },
  {
    id: 'scikit-learn',
    name: 'Scikit-Learn',
    category: 'aiml',
    proficiency: 'Proficient',
    x: 380,
    y: 190,
    icon: 'scikit-learn',
    color: '#F7931E',
    accentBg: '#FFFBEB',
    description: 'Supervised & unsupervised learning: Linear/Logistic regression, Random Forests, K-Means clustering, and metrics.',
    docUrl: 'https://scikit-learn.org/',
    relatedIds: ['python', 'pandas', 'numpy', 'nlp'],
    tag: 'ML Pipelines',
  },
  {
    id: 'nlp',
    name: 'NLP & Text Analytics',
    category: 'aiml',
    proficiency: 'Working Knowledge',
    x: 580,
    y: 200,
    icon: 'sparkles',
    color: '#7C3AED',
    accentBg: '#F5F3FF',
    description: 'Bag of Words (BoW), TF-IDF, Naive Bayes sentiment classifiers, and preprocessing tokenization.',
    docUrl: 'https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction',
    relatedIds: ['scikit-learn', 'python'],
  },
  {
    id: 'deep-learning',
    name: 'PyTorch / TF',
    category: 'aiml',
    proficiency: 'Currently Learning',
    x: 770,
    y: 150,
    icon: 'pytorch',
    color: '#EE4C2C',
    accentBg: '#FFF1F2',
    description: 'Currently studying deep neural network architectures, backpropagation math, and computer vision models.',
    docUrl: 'https://pytorch.org/',
    relatedIds: ['scikit-learn', 'python'],
    tag: 'Active Study',
  },

  // CS Core & Databases (Center - Bottom)
  {
    id: 'dsa',
    name: 'Data Structures & Algo',
    category: 'cs',
    proficiency: 'Working Knowledge',
    x: 230,
    y: 340,
    icon: 'code',
    color: '#2563EB',
    accentBg: '#EFF6FF',
    description: 'Arrays, Linked Lists, Trees, Graphs, Sorting, Binary Search, Dynamic Programming, and complexity analysis.',
    docUrl: 'https://leetcode.com/',
    relatedIds: ['python', 'java'],
    tag: 'Problem Solving',
  },
  {
    id: 'oop',
    name: 'OOP & System Design',
    category: 'cs',
    proficiency: 'Proficient',
    x: 420,
    y: 350,
    icon: 'layers',
    color: '#0891B2',
    accentBg: '#ECFEFF',
    description: 'Encapsulation, inheritance, polymorphism, abstraction, design patterns, and modular software design.',
    docUrl: 'https://dev.java/learn/',
    relatedIds: ['java', 'python'],
  },
  {
    id: 'sql',
    name: 'SQL & DBMS',
    category: 'cs',
    proficiency: 'Working Knowledge',
    x: 620,
    y: 340,
    icon: 'database',
    color: '#0284C7',
    accentBg: '#F0F9FF',
    description: 'Relational database schema design, normalization, complex multi-table JOINs, indexing, and Python integration.',
    docUrl: 'https://www.postgresql.org/docs/',
    relatedIds: ['python', 'pandas'],
  },

  // Web & Dev Tools (Right - Top)
  {
    id: 'git-github',
    name: 'Git & GitHub',
    category: 'tools',
    proficiency: 'Proficient',
    x: 820,
    y: 40,
    icon: 'github',
    color: '#181717',
    accentBg: '#F4F4F5',
    description: 'Version control workflows, branching strategies, pull requests, merge conflict resolution, and open source hygiene.',
    docUrl: 'https://git-scm.com/',
    relatedIds: ['vscode'],
    tag: 'Daily Habit',
  },
  {
    id: 'vscode',
    name: 'VS Code & Jupyter',
    category: 'tools',
    proficiency: 'Proficient',
    x: 820,
    y: 280,
    icon: 'terminal',
    color: '#007ACC',
    accentBg: '#F0F9FF',
    description: 'Primary IDE setup: Python virtual environments, interactive Jupyter notebooks, debugger breakpoints, and extensions.',
    docUrl: 'https://code.visualstudio.com/',
    relatedIds: ['git-github', 'python'],
  },
  {
    id: 'web-stack',
    name: 'Web Dev (HTML/CSS/JS)',
    category: 'web',
    proficiency: 'Working Knowledge',
    x: 980,
    y: 140,
    icon: 'globe',
    color: '#E34F26',
    accentBg: '#FFF7ED',
    description: 'Modern responsive web interfaces, DOM manipulation, flexbox/grid layouts, and clean API consumption.',
    docUrl: 'https://developer.mozilla.org/',
    relatedIds: ['react'],
  },
  {
    id: 'react',
    name: 'React & Tailwind',
    category: 'web',
    proficiency: 'Working Knowledge',
    x: 1010,
    y: 280,
    icon: 'react',
    color: '#06B6D4',
    accentBg: '#ECFEFF',
    description: 'Component architecture, state hooks, responsive styling, and modern interactive dashboard prototyping.',
    docUrl: 'https://react.dev/',
    relatedIds: ['web-stack'],
  },

  // Creative Tools (Bottom Right)
  {
    id: 'davinci',
    name: 'DaVinci Resolve',
    category: 'creative',
    proficiency: 'Working Knowledge',
    x: 850,
    y: 410,
    icon: 'film',
    color: '#E11D48',
    accentBg: '#FFF1F2',
    description: 'Cinematic video editing, Fairlight audio mastering, timeline pacing, and node-based color grading.',
    docUrl: 'https://www.blackmagicdesign.com/products/davinciresolve',
    relatedIds: ['premiere'],
    tag: 'Creative Craft',
  },
  {
    id: 'premiere',
    name: 'Premiere & CapCut',
    category: 'creative',
    proficiency: 'Working Knowledge',
    x: 1030,
    y: 410,
    icon: 'video',
    color: '#9999FF',
    accentBg: '#FAF5FF',
    description: 'Fast digital storytelling, short-form editing, multi-track audio synching, and dynamic motion graphics.',
    docUrl: 'https://www.adobe.com/products/premiere.html',
    relatedIds: ['davinci'],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'farmdirect-ai',
    title: 'FarmDirect AI',
    tagline: 'Direct Agricultural Supply-Chain & Price Forecasting Platform',
    category: 'AI / ML',
    featured: true,
    image: '/assets/farmdirect.jpg',
    problem:
      'Agricultural smallholders lose up to 35% of crop value to predatory commission agents and middlemen who exploit asymmetrical market information, causing price volatility and reduced farmer margins.',
    solution:
      'Engineered an intelligent direct-to-consumer marketplace with an ML price forecasting model that predicts fair mandi prices using historical seasonal trends, localized demand spikes, and rainfall patterns, enabling farmers to sell directly with transparent margins.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'React', 'Tailwind CSS', 'Flask API'],
    contributions: [
      'Built data preprocessing pipeline in Pandas to aggregate historical crop wholesale indices and seasonal harvest volumes.',
      'Trained an ensemble regression model to benchmark fair farm-gate pricing with low mean absolute error.',
      'Designed responsive frontend dashboard for farmers to list produce batches and track live offer requests from local consumers.',
    ],
    recognition: 'Hackathon Innovation Project',
    metrics: 'Eliminates 20-30% middleman price markup in simulated supply runs',
    githubUrl: 'https://github.com/',
    liveUrl: 'https://farmdirect-demo.app',
    details:
      'Developed during a competitive university hackathon targeting UN Sustainable Development Goal 2 (Zero Hunger) and economic empowerment for regional growers.',
  },
  {
    id: 'sentiment-nlp-pipeline',
    title: 'Customer Sentiment Analytics Pipeline',
    tagline: 'End-to-End Text Classification & Live MLOps Reporting Dashboard',
    category: 'AI / ML',
    featured: false,
    image: '/assets/portrait.jpg',
    problem:
      'Unstructured customer reviews across ecommerce channels arrive in thousands daily, creating manual bottlenecks and delayed incident escalation.',
    solution:
      'Created an automated natural language pipeline utilizing TF-IDF vectorization and multi-class Naive Bayes classification to categorize feedback polarity, served via lightweight Flask REST API endpoints and summarized into interactive reporting visuals.',
    technologies: ['Python', 'Scikit-learn', 'NLTK', 'Flask REST API', 'SQL', 'Power BI'],
    contributions: [
      'Implemented clean text tokenization, stop-word filtering, and n-gram feature extraction using NLTK and Scikit-learn.',
      'Deployed inference API with structured JSON logging and relational SQL storage for time-series trend tracking.',
      'Formulated evaluation confusion matrix achieving high precision on positive/negative sentiment splits.',
    ],
    recognition: 'EduSkills Capstone Project (Week 8)',
    githubUrl: 'https://github.com/',
  },
  {
    id: 'crop-yield-advisor',
    title: 'Intelligent Crop Yield & Climate Advisor',
    tagline: 'Machine Learning Regression for Soil & Weather Harvest Optimization',
    category: 'AI / ML',
    featured: false,
    image: '/assets/farmdirect.jpg',
    problem:
      'Unseasonal monsoon shifts and erratic temperature fluctuations disrupt traditional sowing calendars, leading to yield loss for rainfed farming.',
    solution:
      'Trained Random Forest and Gradient Boosting regression models on agricultural datasets covering NPK nutrient levels, rainfall, and temperature variables to provide optimal harvest window recommendations.',
    technologies: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
    contributions: [
      'Performed exploratory data analysis and feature correlation heatmaps to isolate the top 4 yield determinants.',
      'Applied hyperparameter tuning via GridSearch to prevent overfitting on regional soil variances.',
    ],
    recognition: 'Academic Research Prototype',
    githubUrl: 'https://github.com/',
  },
  {
    id: 'creative-media-studio',
    title: 'Creative Media & Tech Storytelling',
    tagline: 'High-Impact Video Production, Color Science & Educational Motion',
    category: 'Creative',
    featured: false,
    image: '/assets/portrait.jpg',
    problem:
      'Complex technical concepts and software engineering tutorials often struggle to capture audience attention without compelling pacing and visual clarity.',
    solution:
      'Produced engaging technical video walkthroughs and hackathon showcase demos utilizing DaVinci Resolve color grading, multi-track audio design, and smooth motion graphics.',
    technologies: ['DaVinci Resolve', 'Adobe Premiere Pro', 'CapCut', 'Audio Mastering'],
    contributions: [
      'Edited dynamic demo reels and product showcase pitches that helped secure hackathon recognition.',
      'Authored scripted video explanations breaking down machine learning concepts visually.',
    ],
    githubUrl: 'https://github.com/',
  },
];

export const INTERNSHIP_DETAILS: InternshipData = {
  studentName: 'IRFAN ALI SHAIK',
  stream: 'B.Tech',
  branch: 'B.Tech (Artificial Intelligence and Machine Learning)',
  institute: 'Sagi Ramakrishnam Raju Engineering College (SRKR)',
  domain: 'Machine Learning & Data Science',
  duration: 'October 2026 - December 2026',
  programTitle: '8-Week AICTE – EduSkills Virtual Internship Program',
  refNo: 'C19Y2026M101599325',
  aicteStudentId: 'STU57df7013f77001789669877',
  status: 'Selected for Internship (Internship Offer)',
  statusNote:
    'Official selection under the patronage of AICTE & EduSkills Foundation. Validated for 8-week structured curriculum and final assessment.',
  curriculum: [
    {
      week: 1,
      module: 'ML Foundations & Python for Data Science',
      description:
        'Introduction to Machine Learning & Data Science ecosystem, Python/Anaconda setup, NumPy arrays, operations, broadcasting, and core data handling tasks.',
      skills: ['Python', 'NumPy', 'Data Handling', 'Broadcasting'],
    },
    {
      week: 2,
      module: 'Data Manipulation & Visualization',
      description:
        'Data processing with Pandas (cleaning, transformation, aggregation) and exploratory data analysis using Matplotlib and Seaborn visualizations.',
      skills: ['Pandas', 'Matplotlib', 'Seaborn', 'EDA'],
    },
    {
      week: 3,
      module: 'Supervised Learning & Feature Engineering',
      description:
        'Scikit-learn workflow, linear & logistic regression, preprocessing techniques (scaling, encoding), and feature engineering strategies.',
      skills: ['Scikit-learn', 'Linear Regression', 'Feature Scaling', 'Encoding'],
    },
    {
      week: 4,
      module: 'Model Evaluation & Unsupervised Learning',
      description:
        'Bias-variance tradeoff, cross-validation, advanced metrics, clustering with K-Means, and cluster evaluation techniques.',
      skills: ['Cross-Validation', 'K-Means', 'Model Metrics', 'Bias-Variance'],
    },
    {
      week: 5,
      module: 'Text Analytics & NLP Fundamentals',
      description:
        'Text preprocessing, BoW, TF-IDF, Naive Bayes classification, and building spam/sentiment detection systems.',
      skills: ['NLP', 'TF-IDF', 'Naive Bayes', 'Text Classification'],
    },
    {
      week: 6,
      module: 'SQL Integration for Data Science',
      description:
        'Relational database concepts, SQL queries & joins, integrating Python with SQL databases, executing queries, and Pandas-SQL workflows.',
      skills: ['SQL', 'Relational DB', 'Query Joins', 'Pandas-SQL'],
    },
    {
      week: 7,
      module: 'Model Deployment & Advanced ML Techniques',
      description:
        'Model deployment using Flask APIs, dashboards with Power BI, ensemble methods (Random Forest, Gradient Boosting), and hyperparameter tuning.',
      skills: ['Flask API', 'Power BI', 'Random Forest', 'Gradient Boosting'],
    },
    {
      week: 8,
      module: 'ML Pipelines, MLOps Capstone Project',
      description:
        'ML pipelines, reproducibility, ethics, introduction to MLOps lifecycle, automation, and a complete capstone project: Customer Sentiment Analysis with text classification, SQL storage, Flask API deployment, and Power BI dashboard reporting.',
      skills: ['MLOps Lifecycle', 'Flask Deployment', 'Capstone Project', 'End-to-End Pipeline'],
    },
  ],
};

export const RESOURCE_LINKS: ResourceLink[] = [
  {
    id: 'python-docs',
    name: 'Python Documentation',
    category: 'Programming',
    description: 'Official Python 3 reference manuals, standard library specifications, and PEP guides.',
    url: 'https://www.python.org/doc/',
    icon: 'python',
    badge: 'Official',
  },
  {
    id: 'java-dev',
    name: 'Java Development Portal',
    category: 'Programming',
    description: 'Oracle and OpenJDK guides, Java SE documentation, and language architecture tutorials.',
    url: 'https://dev.java/',
    icon: 'java',
    badge: 'Official',
  },
  {
    id: 'numpy-docs',
    name: 'NumPy Scientific Computing',
    category: 'AI & Data Science',
    description: 'Array creation, mathematical functions, linear algebra, and fast vectorization routines.',
    url: 'https://numpy.org/doc/stable/',
    icon: 'numpy',
    badge: 'Docs',
  },
  {
    id: 'pandas-docs',
    name: 'Pandas Data Analysis',
    category: 'AI & Data Science',
    description: 'DataFrame operations, grouping, time-series analysis, and CSV/SQL ingestion tools.',
    url: 'https://pandas.pydata.org/docs/',
    icon: 'pandas',
    badge: 'Docs',
  },
  {
    id: 'scikit-docs',
    name: 'Scikit-Learn Machine Learning',
    category: 'AI & Data Science',
    description: 'User guide for supervised regression, clustering, hyperparameter tuning, and preprocessing.',
    url: 'https://scikit-learn.org/stable/',
    icon: 'scikit-learn',
    badge: 'Docs',
  },
  {
    id: 'git-scm',
    name: 'Git Version Control',
    category: 'Development Tools',
    description: 'Comprehensive Pro Git book, command reference, branching models, and plumbing docs.',
    url: 'https://git-scm.com/doc',
    icon: 'git',
    badge: 'Reference',
  },
  {
    id: 'github-docs',
    name: 'GitHub Platform Docs',
    category: 'Development Tools',
    description: 'Collaborative development, GitHub Actions CI/CD workflows, pull requests, and security.',
    url: 'https://docs.github.com/',
    icon: 'github',
    badge: 'Official',
  },
  {
    id: 'mdn-web',
    name: 'MDN Web Docs',
    category: 'Web Development',
    description: 'Mozilla developer reference for HTML5, CSS3, JavaScript ESNext, and modern Web APIs.',
    url: 'https://developer.mozilla.org/',
    icon: 'globe',
    badge: 'Standard',
  },
  {
    id: 'react-dev',
    name: 'React 19 Documentation',
    category: 'Web Development',
    description: 'Component architecture, React Hooks, suspense, and modern frontend application patterns.',
    url: 'https://react.dev/',
    icon: 'react',
    badge: 'Official',
  },
  {
    id: 'leetcode-portal',
    name: 'LeetCode Problem Archive',
    category: 'Computer Science',
    description: 'Algorithmic problem practice covering trees, graphs, dynamic programming, and binary search.',
    url: 'https://leetcode.com/',
    icon: 'code',
    badge: 'Practice',
  },
];
