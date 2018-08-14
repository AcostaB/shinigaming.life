interface WorkExperience {
  companyName: string;
  startDate: Date;
  endDate: Date | null;
  jobTitle: string;
  jobResponsibilities: string[];
}

export const workExperiences: WorkExperience[] = [
  {
    companyName: "Infinity Software",
    startDate: new Date(2015, 10, 1),
    endDate: null,
    jobTitle: "Programmer Analyst",
    jobResponsibilities: [    
      "Senior developer in team of two. Developed the first of several front-end modules for large-scale application. Used popular technologies that include React JS, React-Bootstrap, GraphQL, and Apollo. Developed a shareable grid to be used on all modules with an innovative pattern and the advanced render props technique. Performed unit testing with Jest and Enzyme. Used GitHub Flow branch workflow." ,
      "Maintained and supported client website, built using Joomla! CMS, and CiviCRM. Implemented full support for a donations page, which entailed processing payments with a Stripe payment processor, securing the entire site with TLS, and creating custom html pages with styling. Restored MySQL database from backup as part of server host transition.  ",
      "Developed and supported large scale application using ASP.NET with the MVC pattern, Oracle database, Kendo MVC. Also support desktop application for managing pdfs built with WPF and using Caliburn for an MVVM pattern. ",
      "Maintained desktop application that synced a Quickbooks workbook and client database with the use of the QuickBooks API. Redesigned the clients database structure to better match the QuickBooks data structure. ",
      "Simultaneously maintained five different projects and databases built using VB.NET and Oracle. Restructured and improved the current source control pattern and practices for the projects to more closely follow the popular Git-flow pattern.  ",
      "Performed initial development of online payment feature. Created desktop application that generated a NACHA file based on payment data. Logged and displayed application activity and errors using Log-Four-Net and YALV!. Updated encryption logic to no longer use outdated MD-Five encryption algorithm, and redesigned cryptography architecture to store encryption keys in three different servers, including an Amazon Web Server." ,
      "Performed code deployment and maintained IIS servers for various projects."
    ]
  },
  {
    companyName: "Aderant",
    startDate: new Date(2013, 5, 1),
    endDate: new Date(2015, 10, 1),
    jobTitle: "Software Developer",
    jobResponsibilities: [
      "Converted wireframe designs into full html pages and layouts.",
      "Developed web application using the common patterns Single Page Application (SPA), Model-View-Controller (MVC), and Model-View-View-Model (MVVM).",
      "Created unit tests for both JavaScript and C# code using third party APIs QUnit and Moq.",
      "Created web pages using the root languages: HTML, JavaScript, and CSS.",
      "Incorporated jQuery, Typescript, KendoUI, KnockoutJS, LESS, and RequireJS third party tools to optimize development process.",
      "Created and modified Entity Models using Entity Framework.",
      "Produced and corrected Tables, Views, and Stored Procedures as part of work with our Object Relational Database using Sql Server Management Studios.",
      "Partook in vital bug fixing work with the company’s flagship product using the WPF and XAML languages.",
      "Utilized optimal debugging tools: JSFiddle, Snoop, Chrome Developer Tools, SQL Profiler. "
    ]
  },
]