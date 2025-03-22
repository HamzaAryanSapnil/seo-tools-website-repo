export const TOOLS_CONFIG = [
  {
    slug: "md5-generator",
    name: "MD5 Generator",
    category: "hashing",
    description: "Generate MD5 hashes for files",
    fields: [
      {
        name: "dailyUsage",
        label: "Daily Usage",
        description: "Daily usage restrictions...",
        type: "number",
        defaultValue: 10,
      },
    ],
  },
  {
    slug: "temperature-converter",
    name: "Temperature Converter",
    category: "converters",
    description: "Convert temperatures between different units",
    fields: [
      {
        name: "dailyUsage",
        label: "Daily Usage",
        description: "Daily usage restrictions...",
        type: "number",
        defaultValue: 10,
      },
    ],
  },

  {
    slug: "ad-blocker",
    name: "Ad Blocker",
    category: "privacy-tools",
    fields: [
      {
        name: "enableTrackingProtection",
        label: "Tracking Protection",
        type: "boolean",
        description: "Block trackers and analytics scripts",
        defaultValue: true,
      },
      {
        name: "allowAcceptableAds",
        label: "Allow Non-Intrusive Ads",
        type: "boolean",
        description: "Permit acceptable ads as defined by AdBlock Plus",
        defaultValue: false,
      },
    ],
  },

  {
    slug: "seo-checker",
    name: "SEO Checker",
    category: "seo-tools",
    description: "Check the SEO of a website",
    fields: [
      {
        name: "url",
        label: "URL",
        type: "text",
        description: "Enter the URL to analyze",
      },
      {
        name: "analyze",
        label: "Analyze",
        type: "submit",
        description: "Analyze the URL",
      },
      {
        name: "results",
        label: "Results",
        type: "text",
        description: "The analysis results will be displayed here",
      },
    ],
  },
  {
    slug: "typescript-converter",
    name: "TypeScript to JavaScript Converter",
    category: "Converters",
    description: "Convert TypeScript code to plain JavaScript instantly",
    fields: [
      {
        name: "url",
        label: "URL",
        type: "text",
        description: "Enter the URL to analyze",
      },
      {
        name: "analyze",
        label: "Analyze",
        type: "submit",
        description: "Analyze the URL",
      },
      {
        name: "results",
        label: "Results",
        type: "text",
        description: "The analysis results will be displayed here",
      },
    ],
  },
  {
    slug: "wordpress-password-generator",
    name: "Wordpress Password Generator",
    category: "Password Generators",
    description: "Convert TypeScript code to plain JavaScript instantly",
    fields: [
      {
        name: "url",
        label: "URL",
        type: "text",
        description: "Enter the URL to analyze",
      },
      {
        name: "analyze",
        label: "Analyze",
        type: "submit",
        description: "Analyze the URL",
      },
      {
        name: "results",
        label: "Results",
        type: "text",
        description: "The analysis results will be displayed here",
      },
    ],
  },
  {
    slug: "json-editor",
    name: "Json Editor",
    category: "Editors",
    description: "Edit JSON files",
    fields: [
      {
        name: "url",
        label: "URL",
        type: "text",
        description: "Enter the URL to analyze",
      },
      {
        name: "analyze",
        label: "Analyze",
        type: "submit",
        description: "Analyze the URL",
      },
      {
        name: "results",
        label: "Results",
        type: "text",
        description: "The analysis results will be displayed here",
      },
    ],
  },
];
