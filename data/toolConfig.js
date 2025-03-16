export const TOOLS_CONFIG = [
  {
    slug: "md5-generator",
    name: "MD5 Generator",
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
      // ... other fields
    ],
  },
];
