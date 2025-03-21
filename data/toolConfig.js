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
    slug: "pdf-compressor",
    name: "PDF Compressor",
    category: "pdf-tools",
    fields: [
      {
        name: "dailyUsage",
        label: "Daily Usage",
        description: "Daily usage restrictions...",
        type: "number",
        defaultValue: 10,
      },
      {
        name: "fileSize",
        label: "File Size",
        description: "File size limitation...",
        type: "number",
        defaultValue: 10,
      },

      {
        name: "compressionLevel",
        label: "Compression Level",
        type: "select",
        description: "Select the compression quality",
        defaultValue: "medium",
        options: [
          { value: "low", label: "Low Quality" },
          { value: "medium", label: "Medium Quality" },
          { value: "high", label: "High Quality" },
        ],
      },
      {
        name: "quality", // Generic field name
        label: "Compression Quality",
        type: "select",
        description: "Select the compression quality level",
        defaultValue: "medium",
        options: [
          { value: "low", label: "Low Quality" },
          { value: "medium", label: "Medium Quality" },
          { value: "high", label: "High Quality" },
        ],
      },
      // ... other fields
    ],
  },
  {
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    fields: [
      {
        name: "defaultText",
        label: "Default Meta Tags",
        type: "text",
        description: "Enter default meta tags configuration",
        defaultValue: '<meta name="robots" content="index,follow">',
      },
      {
        name: "dailyUsage",
        label: "Daily Usage",
        type: "number",
        description: "Daily requests limit",
        defaultValue: 15,
      },
    ],
  },

  {
    slug: "image-processor",
    name: "Image Processor",
    category: "image-tools",
    fields: [
      {
        name: "format", // Different select field
        label: "Output Format",
        type: "select",
        defaultValue: "png",
        options: [
          { value: "jpg", label: "JPEG" },
          { value: "png", label: "PNG" },
          { value: "webp", label: "WEBP" },
        ],
      },
    ],
  },
  {
    slug: "video-converter",
    name: "Video Converter",
    category: "video-tools",
    fields: [
      {
        name: "resolution",
        label: "Output Resolution",
        type: "select",
        defaultValue: "1080p",
        options: [
          { value: "720p", label: "HD Ready" },
          { value: "1080p", label: "Full HD" },
          { value: "4k", label: "Ultra HD" },
        ],
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
    category: "hashing",
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
];
