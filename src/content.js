// ── Accessibility Training — All written content ─────────────────────────────
// Edit module titles and body text here.
// Quiz questions/answers live in src/quizzes.js (synced from Google Sheets via npm run sync).
// Image paths use root-relative strings (e.g. "/module-1.svg") — do not add
// the deployment base path; that is handled automatically by the app.

import { QUIZZES } from "./quizzes.js";

export const MODULES_DATA = [
  { id:0, title:"Why accessibility matters", headerTitle:"Designing for Accessibility: One Pixel at a Time", emoji:"💡",
    pages:[
      { sections:[
        { type:"page-title", heading:"Why accessibility in design matters", body:[
          { parts: ["Design is not decoration. Design is communication, and communication only works if everyone can receive it. When we create a digital product, we are making a powerful choice in every design decision: ", { text: "to include or to exclude.", italic: true, semibold: true }] },
          "When we lead and design with empathy, we stop seeing accessibility as a constraint and start seeing it as a creative challenge. One that, when solved well, makes everything better, for everyone."
        ]},
        { type:"stat-grid", heading:"The scale of disability", stats:[
          { value:"1 in 4", percent:25,  label:"U.S. adults live with\nsome form of disability", href:"https://www.cdc.gov/disability-and-health/articles-documents/disability-impacts-all-of-us-infographic.html" },
          { value:"8%",     percent:8,   label:"of men have color\nvision deficiency",             href:"https://pubmed.ncbi.nlm.nih.gov/22472762/" },
          { value:"7.5M",   percent:2.3, label:"Americans have\nvisual impairments",               href:"https://www.cdc.gov/vision-health-data/prevalence-estimates/vision-loss-prevalence.html" },
          { value:"15%",    percent:15,  label:"of the global population\nhas a disability",       href:"https://www.who.int/teams/noncommunicable-diseases/sensory-functions-disability-and-rehabilitation/world-report-on-disability" }
        ]},
        { type:"impact-note", heading:"The impact:", body:"Those numbers reflect that we are not designing for a niche audience or an edge case. It can be your coworker, your parent, your future self. Every one of those numbers represents a real person trying to use something you made, and whether or not they can is largely up to you." }
      ]},
      { sections:[
        { type:"page-title", heading:"Accessibility benefits everyone", body:[
          "Accessible design doesn't just help users with disabilities. It improves the experience for all users. When you design for people at the margins, you end up benefiting everyone."
        ]},
        { type:"curb-cut",
          body:"Subtitles are the perfect example. Originally developed as an accessibility feature for users who are Deaf or hard of hearing, captions are now used by an enormous share of the general population: people watching videos in noisy environments like airports or cafes, people learning in a second language, people who simply prefer to read along. A feature born from accessibility became a mainstream expectation.\n\nThe same principle plays out across design, again and again:",
          items:[
            "High contrast modes, designed for users with low vision, are beloved by anyone using a device in bright sunlight.",
            "Voice interfaces, built for users with motor impairments, became the foundation of smart speakers that millions use daily while cooking, driving, or multitasking.",
            "Keyboard navigation, essential for users who can't use a mouse, benefits power users who prefer not to reach for one.",
            "Readable typography and clear visual hierarchy, critical for users with cognitive or learning differences, makes content more digestible for everyone, including people who are simply tired or distracted.",
            "Autocomplete and predictive text, originally developed to help users with motor difficulties reduce keystrokes, is now a feature every smartphone user relies on."
          ]
        },
        { type:"spectrum", heading:"Disability is a spectrum", items:[
          { category:"Permanent",   subtitle:"One arm",        image:"/permanent.svg" },
          { category:"Situational", subtitle:"Holding a baby", image:"/situational.svg" },
          { category:"Temporary",   subtitle:"Broken arm",     image:"/temporary.svg" }
        ]}
      ]},
      { sections:[
        { type:"page-title", heading:"The designer's responsibility", body:[
          "As designers, we hold more power than we often acknowledge. Long before a single line of code is written, we decide the structure of an experience. We choose color palettes, define hierarchy, determine flow. We set the tone (literally and figuratively) for how a product feels to every person who uses it.",
          { parts:[ "A Deque study determined that ", { text:"67% of accessibility issues are introduced at the design stage", href:"https://www.deque.com/blog/is-closing-the-web-accessibility-design-development-gap-a-bridge-too-far/" }, ". Which means that by the time an engineer writes the first line of code, the damage is often already done, and that puts the responsibility and opportunity directly in our hands." ]}
        ]},
        { type:"cost-chart" },
        { type:"text", heading:"The longer you wait, the more it costs", body:[
          "See those numbers on the curve? They're cost multipliers. Fix an accessibility issue during design and it's relatively cheap. Let it survive to production and you're paying 37.5x more to fix the exact same problem.",
          "That 67% stat means most of those problems started in design in the first place, which puts us, designers, in a pretty unique position. We can be the reason things break, or the reason they never do."
        ]}
      ]}
    ],
    quiz: QUIZZES[0]
  },
  { id:1, title:"WCAG: The Global Standard for Accessibility", emoji:"📐",
    pages:[
      { sections:[
        { type:"page-title", heading:"Accessibility has a rulebook. It's called WCAG.", body:[
          "WCAG stands for Web Content Accessibility Guidelines. It is the internationally recognized standard for building digital experiences that work for everyone. Published by the W3C and referenced by governments, courts, and organizations worldwide, WCAG is the closest thing the web has to a universal definition of what 'accessible' actually means.",
          "WCAG 2.2 is the current version. And while it covers a lot of ground, everything inside it traces back to four foundational principles known as POUR."
        ]},
        { type:"pour-grid-rich", items:[
          { letter:"P", word:"Perceivable",    image:"/perceivable.svg",    title:"Information has to be receivable, not just visible.", body:"If a user can't see, hear, or otherwise sense the content you're presenting, it might as well not exist. Alt text for images, captions for video, sufficient color contrast. These elements ensure that nothing essential is invisible to any sense." },
          { letter:"O", word:"Operable",       image:"/operable.svg",       title:"Your interface has to work however a person interacts with it.", body:"Not everyone uses a mouse. Not everyone taps a screen. Keyboard navigation, focus states, no flashing content. Operability means your product responds to the full range of human input, not just the most common one." },
          { letter:"U", word:"Understandable", image:"/understandable.svg",  title:"Can someone actually make sense of what they're looking at?", body:"Clear error messages, consistent navigation, predictable interactions. Understandable design doesn't just present information, it communicates it. If a user has to guess what happens next, something has already gone wrong." },
          { letter:"R", word:"Robust",         image:"/robust.svg",          title:"Your product needs to work across technologies, not just today.", body:"Not just on your browser, on your device, but also across screen readers and assistive tools. Proper semantic HTML and ARIA labels ensure that as technology evolves, your product remains usable. Robustness is how accessibility stays accessible over time." }
        ]}
      ]},
      { sections:[
        { type:"page-title", heading:"Conformance levels", body:[
          "Not all accessibility criteria carry the same weight. WCAG organizes its guidelines into three tiers, each one building on the last, each one raising the bar for what an inclusive experience looks like.",
          "Think of them less as grades and more as a spectrum of commitment."
        ]},
        { type:"levels-rich", levels:[
          { level:"A",   image:"/level-a.svg",   label:"Minimum | Must meet",     desc:"Failing here blocks access entirely.",                           height:300 },
          { level:"AA",  image:"/level-aa.svg",  label:"Standard | Our target",   desc:"Required by ADA and Section 508, and most legal standards.",    height:360 },
          { level:"AAA", image:"/level-aaa.svg", label:"Enhanced | Gold standard", desc:"Not required, but significantly raises the bar for everyone.", height:420 }
        ]},
        { type:"page-body", paragraphs:[
          { text:"Level A: is non-negotiable. Failing it means your product is actively unusable for some people.", bullet:true },
          { text:"Level AA: is where the industry, the law, and your users expect you to be. It's the difference between a product that tolerates accessibility and one that genuinely practices it.", bullet:true },
          { text:"Level AAA: goes further. Addressing edge cases and nuanced needs that not every product can, or needs to, fully satisfy.", bullet:true },
          "Most teams aim for AA and call it done. That's the legal standard, and meeting it matters. But as you'll see throughout this course, the most thoughtful designers treat AA as the starting point, not the finish line."
        ]},
      ]}
    ],
    quiz: QUIZZES[1]
  },
  { id:2, title:"WCAG principles | Perceivable", emoji:"👁️",
    pages:[
      { sections:[
        { type:"guideline-cards",
          heading:"1. Perceivable",
          href:"https://www.w3.org/TR/WCAG22/#perceivable",
          intro:[
            "The principle of perceivability is essential for web accessibility, ensuring that all users, regardless of their sensory abilities, can perceive information and user interface components. This is foundational to making digital content accessible and inclusive, accommodating users with diverse sight, hearing, movement, and cognitive abilities.",
            "There are four key guidelines to follow:"
          ],
          cards:[
            { title:"Text alternatives",  image:"/text-alternatives.svg",  desc:"Making non-text content accessible. Not everyone can access visual information the same way.",                                              href:"https://www.w3.org/TR/WCAG22/#text-alternatives",  tooltip:"WCAG 1.1 — Text alternatives" },
            { title:"Time-based media",   image:"/time-based-media.svg",   desc:"Making audio and video content accessible, especially for users who can't see or hear it.",                                               href:"https://www.w3.org/TR/WCAG22/#time-based-media",   tooltip:"WCAG 1.2 — Time-based media" },
            { title:"Adaptable",          image:"/adaptable.svg",          desc:"Creating content that can be presented in different ways without losing meaning.",                                                         href:"https://www.w3.org/TR/WCAG22/#adaptable",          tooltip:"WCAG 1.3 — Adaptable" },
            { title:"Distinguishable",    image:"/distinguishable.svg",    desc:"Ensuring that web content information is not conveyed through color alone, and all content is visible for all.", href:"https://www.w3.org/TR/WCAG22/#distinguishable",    tooltip:"WCAG 1.4 — Distinguishable" }
          ]
        }
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"1.1 Text alternatives",
          headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/text-alternatives.html",
          intro:"All non-text content must have a text alternative. This crucial guideline ensures that users who cannot see or interpret visual elements can still understand them, as the text alternatives convey the same purpose or information as the visual content. Decorative elements do not require a text alternative. A decorative element is one that adds visual polish but carries no informational value, you should annotate in your designs when a visual element is purely decorative.",
          criteria:[
            { title:"1.1.1 Non-text content", level:"A", tags:["1.1.1: Non-text Content"],
              titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
              body:"Every piece of non-text content in your designs needs a text alternative unless it's decorative. That distinction matters, because getting it wrong in either direction creates problems: missing alternative text leaves screen reader users without information, while adding alternative text to decorative content creates noise that makes navigation harder.",
              examplesIntro:"Here are 3 example scenarios of the non-text content that requires a text alternative:",
              examples:[
                { title:"Icon buttons", image:"/Images/Perceivable/icon-button.svg", imageInteraction:"/Images/Perceivable/icon-button-interaction.svg", desc:"An icon button that lacks a visible label must have an accessible name that clearly describes its intended action, not merely its visual appearance. Without an accessible name:", descItems:["Screen reader users will not understand the button's purpose.","Other users who may not recognize the icon's meaning will also be unclear about the button's function."], descFooter:"Pro Tips:", descFooterItems:["Display the accessible name in a tooltip that appears upon hover and focus.","Prioritize using buttons that include text labels to clarify their purpose for users, rather than relying solely on icons."], dont:{ caption:"Don't use an icon button without an accessible name — screen readers will announce it by its file name or skip it entirely." }, do:{ caption:"Do add an aria-label that describes the button's action, such as 'Close dialog' or 'Share to Twitter'." } },
                { title:"Meaningful images", image:"/Images/Perceivable/alt-image.png", desc:"For images that convey essential information or context, a concise, descriptive alternative text (alt text) is required. This alt text should be under 125 characters and clearly communicate the image's purpose and context. The alt text serves two primary functions: it is read aloud to screen reader users, and it is displayed as a text substitute when the image fails to load.", descFooter:"If alt text is omitted, the image will be named by its filename, which is unhelpful to the user because it lacks context.", inlineSuccess:`alt="Open kitchen with white cabinets, quartz countertops, stainless steel appliances, and dark hardwood floors, opening to a dining area and living room."`, inlineError:[`alt="Kitchen image"`,`alt="IMG_387"`], dont:{ caption:"Don't leave alt text blank or use 'image.png' for images that communicate content or context." }, do:{ caption:"Do write alt text that conveys the meaning of the image to someone who cannot see it." } },
                { title:"Charts", chartExample:true, desc:"Charts use visuals to convey complex information to users. But since they are another form of images, these provide serious accessibility issues to colorblind users and users of screen readers. Here is how you can make your charts accessible:", descItems:["Provide a brief description of what the chart is about along with the title","Provide alternative text for basic visualisations","For complex charts, provide a text summary in addition to the alternative text","Provide a properly coded data table near the chart","Provide the source link of the information, if there is one"], descFooter:"This serves multiple audiences because the text can explain the summary of the chart, the table can provide exact data for those who are interested, and the link can provide the source and context of the data.", dont:{ caption:"Don't provide a chart image without any text description or data table — colorblind users and screen reader users will have no way to access the information the chart conveys." }, do:{ caption:"Do pair charts with a text summary that captures the key insight and a properly coded data table near the chart so users can access both the narrative and the exact data." } }
              ]
            }
          ]
        }
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"1.2 Time-based media",
          headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/time-based-media",
          intro:"Audio and video content needs to be accessible to users who can't see or hear it. Designers have more influence here than they might think. Planning for captions, transcripts, and audio descriptions at the start of a project means they actually get built. Leaving it to developers at the end means they probably don't.",
          criteria:[
            { title:"Include captions and transcripts", level:"A/AA", tags:["1.2.1: Audio-only and Video-only","1.2.2: Captions","1.2.3: Audio description"],
              noTitleLink: true,
              tagLinks:[
                { label:"1.2.1 - Audio-only and Video-only (Prerecorded)", url:"https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded" },
                { label:"1.2.2 - Captions (Prerecorded)", url:"https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded" },
                { label:"1.2.3 - Audio Description or Media Alternative (Prerecorded)", url:"https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded" }
              ],
              body:"Any audio or video content needs a transcript, captions, or both. Users with hearing or vision disabilities can then access the content through reading or through a screen reader announcing the text alternative.",
              examplesIntro:"Here are 2 example scenarios of the role that designers play in this guideline:",
              examples:[
                { title:"You're providing the content", desc:"Include button controls that let users toggle captions on and off, and/or download the transcript. Loop in the content team early so they can deliver the written content.", videoExample: true },
                { title:"You're designing a platform where others upload content", desc:"Make caption and transcript fields required. If you don't, people will skip them every time.", uploadExample: true },
              ]
            }
          ]
        }
      ]},
      { sections:[{ type:"guideline-detail",
        heading:"1.3 Adaptable",
        headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/adaptable",
        intro:"This guideline focuses on ensuring content is meaningful regardless of how it's presented. Structure and organization are key, especially providing text alternatives for information conveyed through visuals or audio. The goal is for content to be universally understandable and navigable, enabling those who may not grasp visual or auditory information to still access the core meaning.",
        criteria:[
          { title:"1.3.1 Info and Relationships", level:"A", tags:["1.3.1: Info and relationships"], titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
            body:"When designing, prioritize making visual cues (such as color, size, and layout) accessible to all users. It is essential that critical information conveyed visually is also provided in a text alternative. For instance, you are designing a form with required fields:",
            bodyItems:[
              "If an asterisk (*) is used to denote a required field, you must include explanatory text (e.g., \"Required fields are marked with an asterisk (*)\" or simply the word \"required\" next to the field) to ensure users who cannot understand the meaning of an asterisk, can still understand the requirement.",
              "If a required field is visually indicated with a red border when a user attempts to submit the form without filling it out, you must also provide an explicit error message (such as \"This field is required\"), to ensure users who cannot perceive color can still understand the requirement."
            ],
            examples:[{ title:"Required field examples", infoRelationshipsExample: true }] },
          { title:"1.3.2 Meaningful Sequence", level:"A", tags:["1.3.2: Meaningful sequence"], titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence",
            body:"The intended reading order of design elements must be carefully considered and documented. While the order may seem clear to you, this is subjective, and a lack of documentation can lead to incorrect coding. Work closely with developers to confirm the correct reading order for screen readers, as this collaboration is vital for users to accurately understand the sequence and context of all elements.",
            examples:[{ title:"Card reading order", image:"/meaningful-sequence-1.svg", imageInteraction:"/meaningful-sequence-2.svg" }] },
          { title:"1.3.3 Sensory Characteristics", level:"A", tags:["1.3.3: Sensory characteristics"], titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics",
            body:"To ensure universal understanding of an element's function, do not depend solely on visual or auditory cues like shape, color, size, placement, orientation, or sound to convey meaning. Always supplement these with explicit labels or clear instructions. For instance, in data charts, instead of relying only on color to differentiate data, use distinct line stylings for each data point and include corresponding labels in the legend.",
            examples:[{ title:"RealEstimate℠ valuation chart", sensoryExample: true }] },
          { title:"1.3.4 Orientation", level:"AA", tags:["1.3.4: Orientation"], titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/orientation",
            body:"Design pages to support both portrait and landscape screen orientations. Restrict orientation only when it is absolutely necessary for the content or functionality (for example, in check deposit or piano applications). Maintaining this flexibility is vital for accessibility, especially for users who may have difficulty rotating their screen, such as those with a device mounted on a wheelchair.",
            examples:[{ title:"Orientation", descFooter:"Pro Tip: Optimize the horizontal layout by rearranging UI elements, ensuring consistent content access for the user across all views.", orientationExample: true }] },
          { title:"1.3.5 Identify Input Purpose", level:"AA", tags:["1.3.5: Identify input purpose"], titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose",
            body:"This criteria is about enhancing user experience and accessibility by helping users and technologies understand the purpose of input fields in forms and content. To enhance form accessibility, prioritize clear and concise labeling and incorporate autofill functionality:",
            bodyItems:[
              "For complex forms, divide them into manageable sections and provide straightforward instructions.",
              "Utilize visual elements, such as icons, to clarify input fields, and simplify forms by minimizing the number of fields.",
              "Implement real-time validation with descriptive error messages.",
              "Implement autocomplete features to reduce physical typing effort, lower cognitive load, and minimize spelling errors, benefiting users with motor, cognitive, or visual impairments."
            ],
            examples:[{ title:"Agent contact form with labeled fields", inputPurposeExample: true }] }
        ]
      }]},
      { sections:[{ type:"guideline-detail",
        heading:"1.4 Distinguishable",
        headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/distinguishable",
        intro:"This principle focuses on making web content more accessible through better visual presentation. It addresses the needs of users who have visual impairments like color blindness, low vision, or sensitivity to brightness, ensuring that information is not conveyed through color alone, text is readable and understandable, and the content is visible and distinguishable.",
        criteria:[
          { title:"1.4.1 Use of Color", level:"A", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/use-of-color", tags:["1.4.1: Use of color"], body:"Avoid color dependency. This criterion focuses on ensuring that color is not the sole method of conveying information, indicating an action, prompting a response, or distinguishing a visual element. This is especially important for users who are color blind or have difficulty distinguishing colors can still understand and interact with content effectively.", bodyParagraphs:["For example, designers frequently use a disabled (greyed-out) button to indicate that an action is currently unavailable. However, this common practice often causes confusion because users cannot determine why the button is inactive from its appearance alone.","To improve accessibility and clarity, always include accompanying text that explains the reason for the button's unavailability. This explanation can be provided through:"], bodyItems:["Plain text near the element.","Inline messages.","Tooltips that appear upon hover."], bodyNote:"Note that our design system's disabled elements already incorporate built-in tooltips along with a \"Not allowed\" cursor to facilitate this explanation.", examples:[{ title:"Selected state indicator", desc:"A selected tab or filter should not rely only on a color change to communicate selection.", useOfColorExample: true, dont:{ caption:"Don't indicate selection using color change alone — users with color vision deficiency may not perceive the difference." }, do:{ caption:"Do pair the color change with a visual indicator like a bold border, underline, or filled background shape." } }] },
          { title:"1.4.2 Audio Control", level:"A", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/audio-control", tags:["1.4.2: Audio control"], body:"For any audio lasting longer than 3 seconds, users must have control to adjust the volume (louder, quieter, or muted). This control should not compromise the product's functionality, interfere with assistive technologies, or cause user distraction.", examples:[{ title:"Audio Control", image:"/Images/Perceivable/Audio Control.svg", audioControlExample: true }] },
          { title:"UI Contrast ratios", level:"AA", noTitleLink: true, tags:["1.4.3: Contrast (minimum)"], tagLinks:[{ label:"1.4.3 Contrast (Minimum)", url:"https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum" },{ label:"1.4.11 Non-text Contrast", url:"https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast" }], body:"Text and other important UI elements must have sufficient contrast with its background to ensure readability and accessibility, with the required ratio depending on the font size or type of element.", bodyItems:["Normal: Text smaller than 24px (regular), or smaller than 18px (bold) requires a minimum contrast ratio of 4.5:1.","Large: Text that is bigger than 24px (regular), or bigger than 18px (bold) requires a minimum contrast ratio of 3:1.","User Interface Components & Graphics: Minimum 3:1 ratio for components like buttons or input borders.","Exceptions: Logotypes, and purely decorative elements are exempt."], bodyNote:["Pro Tip: Always use the design system's semantic tokens for colors and ",{ semiboldItalic: true, text:"avoid altering the colors on existing components." }," These components have been designed with accessibility guidelines, including color contrast, already met. If you are designing a new pattern that introduces colors, you must always double-check the color contrast using a tool like ",{ text:"the Stark plugin for Figma.", href:"https://www.figma.com/community/plugin/732603254453395948/stark-contrast-accessibility-checker" }], },

          { title:"Support scalable UI", level:"AA", noTitleLink: true, tags:["1.4.4: Resize text"], tagLinks:[{ label:"1.4.4 Resize Text", url:"https://www.w3.org/WAI/WCAG22/Understanding/resize-text" },{ label:"1.4.10 Reflow", url:"https://www.w3.org/WAI/WCAG22/Understanding/reflow" }], body:"Content should stay readable and functional as users scale it up. Whether someone is bumping up their font size in browser settings, pinching to zoom on a phone, or relying on zoom as their primary accessibility tool, the content should hold together without breaking layouts or forcing awkward navigation.", bodyItems:["Text must be enlargeable up to 200% using standard browser or device settings, without losing content or functionality.","At 400% zoom, content must adapt to a single column so users never have to scroll both horizontally and vertically to read a line of text."], examples:[{ title:"Resize Text", descFooter:"Pro Tip: To guarantee a positive experience for users who utilize zoom features, designers should create two views for every screen: the default view and a zoomed-in view. This approach allows for necessary adjustments to the UI layout, preventing elements from overlapping and ensuring that text properly wraps when magnified.", image:"/Images/Perceivable/Resize Text 1.svg", imageLabel:"Default view", imageInteraction:"/Images/Perceivable/Resize Text 2.svg", imageInteractionLabel:"Zoomed-in view", imageAlignTop: true }] },
          { title:"1.4.5 Images of Text", level:"AA", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/images-of-text", tags:["1.4.10: Reflow"], body:"When designing elements with text over an image, treat the text and image as distinct layers. Crucially, the text should not be rasterized as part of the image. When exporting, only export the image itself, allowing the engineering (ENG) team to implement the text as actual, selectable text. Embedding text within an image creates significant accessibility issues:", bodyItems:["Legibility: Images can be resized (stretched or shrunk), leading to blurring or pixelation, making the text difficult to perceive.","Contrast: Achieving the necessary color contrast is harder to guarantee when text is embedded in an image.","Testing: Text within an image cannot be automatically tested for accessibility compliance."], examples:[{ title:"Images of Text", image:"/Images/Perceivable/Images of Text.svg", audioControlExample: true }] },


        ]
      }]}
    ],
    quiz: QUIZZES[2]
  },
  { id:3, title:"WCAG principles | Operable", emoji:"⌨️",
    pages:[
      { sections:[
        { type:"guideline-cards",
          heading:"2. Operable",
          href:"https://www.w3.org/TR/WCAG22/#operable",
          intro:["This principle ensures that all users can interact with your interface, regardless of how they navigate. Whether someone uses a keyboard, switch device, voice control, or touch, every function must be reachable and operable. There are 5 guidelines to follow and in the next pages, we will explain how you can design with these guidelines in mind:"],
          cards:[
            { title:"Keyboard Accessible", image:"/Images/Operable/Keyboard accessible.svg", desc:"All functionality in an interface must be operable through a keyboard inputs alone." },
            { title:"Enough time", image:"/Images/Operable/Enough time.svg", desc:"Users must be given enough time to read and interact with content." },
            { title:"Seizures and physical reactions", image:"/Images/Operable/Seizures and physical reactions.svg", desc:"Content must not be designed in a way that is known to cause seizures or physical reactions." },
            { title:"Navigable", image:"/Images/Operable/Navigable.svg", desc:"Users must be able to navigate, find content, and determine where they are." },
            { title:"Input modalities", image:"/Images/Operable/Input modalities.svg", desc:"Users must be able to operate functionality through various input methods beyond keyboard and mouse." }
          ]
        }
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"2.1 Keyboard Accessible",
          headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/keyboard-accessible",
          intro:"Keyboard operability is essential: all functionality must be accessible without a mouse. Users who depend on keyboard navigation, including those using switch access, voice control, or screen readers, must be able to navigate menus, activate buttons and links, fill out forms, and control media players using only the keyboard interface.",
          criteria:[
            { title:"2.1.2 No Keyboard Trap", level:"A", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap", tags:["2.1.2: No keyboard trap"], body:"It is crucial to provide a clear closing option so users can easily exit a situation and never become trapped in a part of the content. This ensures users navigating with a keyboard can move their focus both forward and backward smoothly, without relying on a mouse or getting stuck on any element, including less obvious flow like steps or onboarding tours.", bodyNote:"Pro tip: Allow users to save their in-progress work as a draft. This prevents them from being locked into the current flow, which would otherwise force them to either complete the task or lose all their progress.", examples:[{ title:"Keyboard trap in a modal", image:"/Images/Operable/No keyboard trap 1.svg", imageLabel:"Saving progress mid-flow", imageInteraction:"/Images/Operable/No keyboard trap 2.svg", imageInteractionLabel:"Returning to saved progress", imageMaxWidth: 400 }] },
            { title:"2.1.4 Character Key Shortcuts", level:"A", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts", tags:["2.1.4: Character key shortcuts"], body:"When designing user flows that include shortcuts for advanced users, it is essential to give users the ability to disable or modify these options. Ensure shortcuts are relevant to the current context and provide immediate, clear feedback with the option to undo the action.", examples:[{ title:"Single-key shortcut conflict", image:"/Images/Operable/Character Key Shortcuts.svg", audioControlExample: true }] }
          ]
        },
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"2.2 Enough Time",
          headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/enough-time",
          intro:"Users must be given enough time to read and interact with content. Time limits can create barriers for users who read slowly, have motor impairments, or use assistive technologies that require more time to operate.",
          criteria:[
            { title:"2.2.1 Timing Adjustable", level:"A", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable", tags:["2.2.1: Timing adjustable"], body:"Avoid time-dependent content on websites or apps. If essential (e.g., security tokens), users must see the remaining time and have an option to extend it. Time limits hinder users who need longer to navigate or respond, such as those using screen readers or with cognitive/motor impairments. Adjustable timing ensures accessibility.", examples:[{ title:"Session timeout warning", image:"/Images/Operable/Timing Adjustable.svg", audioControlExample: true }] },
            { title:"2.2.2 Pause, Stop, Hide", level:"A", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/timeouts", tags:["2.2.2: Pause, stop, hide"], body:"This criterion requires that users be able to pause, stop, hide, or control the timing of any information that moves, blinks, scrolls, or updates automatically. This rule covers a variety of elements, including carousels, sliders, blinking advertisements, and automatically refreshing feeds.", bodyNote:"Pro tip: The Haven design system components, such as the carousel, include built-in accessibility features with optional properties like play or pause buttons. These options are provided to support diverse use cases. Therefore, designers must document their intended use case for the component within their designs.", examples:[{ title:"Auto-advancing carousel", image:"/Images/Operable/Pause, Stop, Hide 1.svg", imageLabel:"Figma component", imageInteraction:"/Images/Operable/Pause, Stop, Hide 2.png", imageInteractionLabel:"Figma component props" }] }
          ]
        }
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"2.3 Seizures and Physical Reactions",
          headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/seizures-and-physical-reactions",
          intro:"This guideline requires that web content does not contain anything that flashes more than three times in any one-second period, to prevent the risk of seizures.",
          criteria:[
            { title:"2.3.1 Three Flashes or Below Threshold", level:"A", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold", tags:["2.3.1: Three flashes or below threshold"], body:"Avoid using flashing elements that may provoke seizures. If you use flashing elements, make sure the flash rate is 3 times per second or less. Be careful when using a lot of vibrant colors, many different shapes and moving objects. Try to reduce the flashing movements and the size of the flashing element.", bodyNote:"Pro tip: Do not autoplay content. If the content includes photo-sensitive material, provide a warning to users in advance.", examples:[{ title:"Attention-grabbing animation", image:"/Images/Operable/Three Flashes or Below Threshold.svg", audioControlExample: true, desc:"Rapid flashing or strobing effects used for emphasis are a direct risk to users with photosensitive epilepsy.", dont:{ caption:"Don't use rapid flashing animations to draw attention — content that flashes more than 3 times per second can trigger seizures." }, do:{ caption:"Do use subtle, slow transitions or static emphasis instead of flashing. If animation is necessary, keep it below 3 flashes per second and cover less than 25% of the viewport." } }] }
          ]
        },
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"2.4 Navigable",
          headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/navigable",
          intro:"Crucial for accessibility, the \"Navigable\" principle helps all users, especially those with visual or cognitive disabilities and those using assistive technologies, locate content and understand their position in an interface. Effective navigation ensures users can quickly find information and comprehend their location.",
          criteria:[
            { title:"2.4.2 Page Titled", level:"A", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/page-titled", tags:["2.4.2: Page titled"], body:"Every page must have an accurate and representative title reflecting its content. This is essential for users to quickly understand the page's context upon arrival or when navigating between different tabs or windows.", bodyNote:"Note: While the page content may have an in-menu title, this title might not be perceived by all users as the main page title. Furthermore, the menu might not be visible or available at all screen breakpoints (e.g., on mobile).", examples:[{ title:"Unique page titles", desc:"Each page or screen must have a distinct, descriptive title so users always know where they are.", image:"/Images/Operable/Page Titled 1.svg", imageLabel:"Desktop", imageFlex:1074, imageInteraction:"/Images/Operable/Page Titled 2.svg", imageInteractionLabel:"Mobile", imageInteractionFlex:399, dont:{ caption:"Don't use the same generic title like 'My App' on every page — screen reader users announce the page title on load and rely on it for orientation." }, do:{ caption:"Do write descriptive, unique titles for every page using the pattern 'Page name — App name' so context is immediately clear." } }] },
            { title:"Define focus states and their order", level:"A/AA", noTitleLink: true, tags:["2.4.3: Focus order","2.4.7: Focus visible","2.4.11: Focus not obscured (minimum)"], tagLinks:[{ label:"2.4.3 Focus Order", url:"https://www.w3.org/WAI/WCAG22/Understanding/focus-order" },{ label:"2.4.7 Focus Visible", url:"https://www.w3.org/WAI/WCAG22/Understanding/focus-visible" },{ label:"2.4.11 Focus Not Obscured (Minimum)", url:"https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum" }], body:"These criterions ensure that interactive elements have clear focus states, allowing users to navigate via keyboard or assistive technology. Providing distinct visual cues is essential for users to identify their current location on a page.\n\nSince Haven design system already provide components with built-in focus states, designers primarily need to ensure two things:", bodyItems:["Document a logical and intuitive focus order for their designs.","Verify that the implementation works as expected, making sure focus order is consistent with the visual layout and focused elements remain visible and are not obscured by elements like modals or toolbars."], examples:[{ title:"Sticky header obscuring focus", desc:"A sticky navigation bar or floating toolbar can overlap the focused element, making it invisible to keyboard users.", image:"/meaningful-sequence-1.svg", imageInteraction:"/Images/Operable/define-focus-states-2.svg", dont:{ caption:"Don't let a sticky header cover the focused element — keyboard users lose track of where they are on the page." }, do:{ caption:"Do account for sticky elements in layout and ensure focused items always remain fully visible, never obscured by fixed UI." } }] },
            { title:"2.4.4 Link Purpose (In Context)", level:"A", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context", tags:["2.4.4: Link purpose (in context)"], bodyLinkPhrases:["Learn how to update your contact info,","Click here for more information."], body:"Ensure links and buttons are clearly labeled. Avoid vague text like \"click here\" in favor of descriptive phrases that indicate the link's destination or action. Users should be able to understand the purpose of a link from its text alone, without relying on surrounding context.\n\nFor example, a link that navigates to a help article should read \"Learn how to update your contact info,\" not \"Click here for more information.\" The first option tells users exactly where they're going. The second tells them nothing.", bodyNote:"Pro tip: On modals and other action-oriented flows, mirror the title's action in the button label. If the modal heading is \"Delete your account,\" the primary button should read \"Delete account,\" not \"Confirm.\" This reinforces the action and reduces ambiguity at a critical decision point.", examples:[{ title:"Generic 'Read more' links", image:"/Images/Operable/Link Purpose (In Context).svg", imageMaxWidth:800, desc:"Multiple 'Read more' links on a page all sound identical to a screen reader user scanning links out of context.", dont:{ caption:"Don't label multiple links 'Read more' or 'Click here' — screen reader users navigating by links hear a list of meaningless identical text." }, do:{ caption:"Do write descriptive link text that identifies the destination or action: 'Read the WCAG 2.2 overview' communicates purpose without surrounding context." } }] },
            { title:"2.4.5 Multiple Ways", level:"AA", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways", tags:["2.4.5: Multiple ways"], body:"Offer users multiple methods to access content, such as a site map, a search bar, a categorical navigation menu, a list of related pages, or multiple buttons across the page that lead to the same outcome/page. This approach ensures users are not restricted to linear navigation and can find information through various avenues.", examples:[{ title:"Search plus structured navigation", desc:"Users should be able to reach any content through at least two routes — such as a navigation menu and a search bar.", image:"/Images/Operable/Multiple ways.svg", imageMaxWidth:800, dont:{ caption:"Don't rely on a single navigation path to access all content — users with cognitive disabilities or those lost in a hierarchy benefit from search as an alternative route." }, do:{ caption:"Do provide both structured navigation (menus, categories) and a search function so users can find content using whichever method works best for them." } }] },
            { title:"2.4.6 Headings and Labels", level:"AA", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels", tags:["2.4.6: Headings and labels"], body:"The criterion requires that headings and labels used to describe topics or purposes are clear and concise. Headings should accurately reflect the content sections they represent, and labels should clearly describe the purpose of user interface controls, input fields, and other elements.", bodyParagraphs:["The Haven design system includes non-semantic typography tokens for both display and body text, either of which may be used for headings. However, as a designer, it's essential to document the logical heading order on the page to ensure correct implementation and semantic sense."], bodyTable:{ title:"Heading Level Definitions and Usage", columns:["Heading Level","Purpose","Usage Rule"], rows:[["H1","The Page Title","Use one H1 per page, always. It clearly states the topic of the entire page for all users and screen readers."],["H2","Big Sections / Main Chapters","Use for major content sections. Users often skip between these to navigate the page."],["H3","Subsections","Use for chunks of content that fall within an H2 section."],["H4","Nested Sections","Only use if your content genuinely requires a fourth layer of hierarchy (i.e., a section within an H3)."],["H5 & H6","Rarely Needed","If you find yourself needing these levels, consider reorganizing your content for better clarity."]] }, bodyNote:"Pro tip: To ensure a logical and correct heading structure for documentation, outline your content as a simple bulleted list (similar to writing a recipe) without any visual elements. After you've confirmed that the structure flows logically, document this correct heading order within your design file.", examples:[{ title:"Annotating semantic headings", desc:"Headings that look visually large but are marked as divs in code provide no navigation landmarks for screen readers.", image:"/Images/Operable/heading-and-labels.svg", imageNaturalWidth:1440, imageSide:"/Images/Operable/heading-and-labels-2.svg", imageSideNaturalWidth:631, dont:{ caption:"Don't use Display text styles on divs without annotating the intended heading level — developers will implement plain text and screen reader users lose all heading structure." }, do:{ caption:"Do annotate every section heading in your design file with its semantic level (H1–H6) so developers implement the correct hierarchy for screen reader navigation." } }] }
          ]
        }
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"2.5 Input Modalities",
          headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/input-modalities",
          intro:"This guideline aims to improve accessibility by ensuring digital content is compatible with various input methods beyond just a standard keyboard and mouse. By supporting touchscreens, voice commands, gestures, and other assistive tools, we create a more inclusive experience for users with diverse physical and cognitive abilities.",
          criteria:[
            { title:"Offer simple pointer interactions", level:"A/AA", noTitleLink: true, tags:["2.5.1: Pointer gestures","2.5.7: Dragging movements","2.5.4: Motion actuation"], tagLinks:[{ label:"2.5.1 Pointer Gestures", url:"https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures" },{ label:"2.5.7 Dragging Movements", url:"https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements" },{ label:"2.5.4 Motion Actuation", url:"https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation" }], body:"All touchscreen and pointer-based features should be operable through basic, single-point actions like a click or tap. Complex multi-touch gestures and drag-only interactions can create significant barriers for users with mobility impairments or those using assistive devices. Wherever a feature relies on gestures or dragging to function, a simpler single-pointer alternative should be available so that everyone can navigate and interact with the interface effectively.", examples:[{ title:"Pointer interaction examples", image:"/Images/Operable/Pointer Gestures 1.svg", imageLabel:"Selecting and typing", imageInteraction:"/Images/Operable/Pointer Gestures 2.svg", imageInteractionLabel:"Selecting and dragging" }] },
            { title:"2.5.8 Target Size (Minimum)", level:"AA", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum", tags:["2.5.8: Target size (minimum)"], body:"Touch targets should be at least 24x24px, with a minimum of 8px of spacing between clickable elements.", bodyParagraphs:["Haven components are built with this requirement in mind. When composing layouts, your responsibility is to ensure that spacing between interactive elements meets the 8px minimum. If you are contributing to the design system directly, you are also responsible for meeting the touch target size requirement within the component itself."], examples:[{ title:"Target size examples", image:"/Images/Operable/Target Size (Minimum).svg" }] }
          ]
        }
      ]}
    ],
    quiz: QUIZZES[3]
  },
  { id:4, title:"WCAG principles | Understandable", emoji:"💬",
    pages:[
      { sections:[
        { type:"guideline-cards",
          heading:"3. Understandable",
          href:"https://www.w3.org/TR/WCAG22/#understandable",
          intro:["This principle ensures that information and the operation of the interface is understandable. Content must be readable, interfaces must behave predictably, and users must be helped to avoid and correct mistakes. There are 3 guidelines to follow and in the next pages, we will explain how you can design with these guidelines in mind:"],
          cards:[
            { title:"Readable",          desc:"Content must be readable and understandable, with language attributes that assistive technologies can use.", image:"/Images/Understandable/Readable.svg" },
            { title:"Predictable",       desc:"Web pages must appear and operate in predictable ways so users always know what to expect.", image:"/Images/Understandable/Predictable.svg" },
            { title:"Input assistance",  desc:"Users must be helped to avoid and correct mistakes when providing input.", image:"/Images/Understandable/Input assistance.svg" }
          ]
        }
      ]},
      { sections:[{ type:"guideline-detail",
        heading:"3.1 Readable",
        headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/readable",
        intro:"Readable principle focuses on making web content more understandable by ensuring that the language is clear and easy to read. This is particularly beneficial for users with cognitive disabilities, those who are not fluent in the content\'s language, and users with learning disabilities.",
        criteria:[
          { title:"Present language selection upfront", level:"A/AA", noTitleLink:true, tags:["3.1.1: Language of page","3.1.2: Language of parts"], tagLinks:[{ label:"3.1.1 Language of Page", url:"https://www.w3.org/WAI/WCAG22/Understanding/language-of-page" },{ label:"3.1.2 Language of Parts", url:"https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts" }], body:"If the part of your product supports multiple languages, give users the ability to select their language from a part in the UI that is upfront and easy to see/interact with. From there, make sure language changes within the page are clearly marked. This matters most for users who rely on screen readers and for anyone who isn\'t fluent in the content\'s primary language.", examples:[{ title:"Language selection on first use", desc:"If content is available in multiple languages, the language selection must be one of the first interactions — not buried in settings.", image:"/Images/Understandable/Present language selection upfront 1.svg", imageInteraction:"/Images/Understandable/Present language selection upfront 2.svg", imageLabel:"Consumer", imageInteractionLabel:"Client", imageMaxWidth:320, dont:{ caption:"Don\'t default to a single language without offering a selection screen — screen readers use the page language to determine pronunciation, and wrong language settings produce garbled output." }, do:{ caption:"Do present a clear language selector on first load or onboarding so users can set their preferred language before engaging with any content." } }] },
        ]
      }]},
      { sections:[{ type:"guideline-detail",
        heading:"3.2 Predictable",
        headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/predictable",
        intro:"This principle ensures web interfaces operate in consistent, predictable ways, including stable navigation elements across pages and expected behavior when UI components are activated. That consistency is especially critical for users with cognitive disabilities, vision impairments, or those who rely on assistive technologies.",
        criteria:[
          { title:"Don\'t change context without user confirmation", level:"A", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/on-focus", tags:["3.2.1: On focus","3.2.2: On input"], tagLinks:[{ label:"3.2.1 On Focus", url:"https://www.w3.org/WAI/WCAG22/Understanding/on-focus" },{ label:"3.2.2 On Input", url:"https://www.w3.org/WAI/WCAG22/Understanding/on-input" }], body:"These guidelines focus on making web interactions predictable by ensuring context is only changed when users initiate it or request it. Context of the page shouldn\'t be changed automatically upon interacting with a control.", bodyNote:"Pro tip: Use a modal or toast notification to confirm the outcome of a user\'s action. This gives users, especially those relying on assistive technologies, clear feedback that their interaction was successful and what changed as a result.", examples:[{ title:"Auto-submitting dropdown", desc:"A dropdown that immediately navigates to a new page the moment an option is selected creates an unexpected context change.", image:"/Images/Understandable/Don\'t change context without user confirmation 1.svg", imageInteraction:"/Images/Understandable/Don\'t change context without user confirmation 2.svg", imageLabel:"Before changes", imageInteractionLabel:"After changes", dont:{ caption:"Don\'t trigger a page navigation or form submission automatically when a user selects a dropdown option — this disorients screen reader users who are still exploring." }, do:{ caption:"Do require a separate confirm action (like a \'Go\' button) after a selection so users can review their choice and consciously trigger the change." } }] },
          { title:"3.2.3 Consistent Navigation", level:"AA", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation", tags:["3.2.3: Consistent navigation"], body:"Utilize standardized design system components for headers and footers to ensure a predictable navigational flow throughout the site. Maintain the established naming conventions, icon placement, and structural hierarchy of these global elements unless a system-wide update is implemented. Consistency in this architecture is vital across both desktop and mobile platforms to support a familiar user experience, this includes global navigation and footer navigation.", examples:[{ title:"Navigation order across screens", desc:"If the search icon appears after the profile icon on one screen, it should appear in the same position on all screens.", image:"/Images/Understandable/Consistent Navigation 1.svg", imageInteraction:"/Images/Understandable/Consistent Navigation 2.svg", imageLabel:"Desktop footer consumer", imageInteractionLabel:"Mobile footer consumer", imageMaxHeight:507, dont:{ caption:"Don\'t reorder navigation items or move global controls between screens, users with cognitive disabilities build mental maps that break when layout is inconsistent." }, do:{ caption:"Do maintain the same visual and focus order for all recurring navigation elements across every screen in your product." } }] },
          { title:"3.2.4 Consistent Identification", level:"AA", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification", tags:["3.2.4: Consistent identification"], body:"Ensure consistent navigation across all pages by placing menus, buttons, and repeated elements in the same order. This predictability is crucial for users, especially those with disabilities, who rely on spatial memory and visual cues to navigate. Avoid changing the layout or order of these elements unless the user initiates it.", examples:[{ title:"Submit button label consistency", desc:"Calling the same action \'Submit\', \'Send\', and \'Confirm\' on different forms confuses users who expect consistent labeling.", dont:{ caption:"Don\'t use different labels for the same function across your product, inconsistency forces users to re-evaluate familiar patterns each time." }, do:{ caption:"Do define a vocabulary in your design system: one label per function, applied consistently everywhere, so users immediately recognize familiar controls." } }] },
          { title:"3.2.6 Consistent Help", level:"A", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/consistent-help", tags:["3.2.6: Consistent help"], body:"When help mechanisms are available on a site, they should appear consistently across pages, in the same location and in the same order within menus. Whether that help takes the form of an FAQ, contact form, chatbot, or direct contact information, users should always know where to find it. That reliability is especially important for users with cognitive disabilities, those unfamiliar with the site, and screen reader users who depend on predictable page structure to navigate.", examples:[{ title:"Help link position across pages", desc:"A \'Contact support\' link that appears in the footer on some pages and in the header on others is harder to find in a moment of need.", dont:{ caption:"Don\'t move help resources to different locations between pages — users who need help are already under cognitive load and shouldn\'t have to search for it." }, do:{ caption:"Do place help options (chat, support link, FAQ) in the same position on every page so users can find assistance predictably without additional effort." } }] }
        ]
      }]},
      { sections:[{ type:"guideline-detail",
        heading:"3.3 Input assistance",
        headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/input-assistance",
        intro:"This principle focuses on helping users avoid mistakes and recover from them when they happen. That means clear labels, instructions, and suggestions for correcting errors, along with mechanisms that prevent significant mistakes in high-stakes contexts like legal or financial transactions. For users with visual impairments, cognitive disabilities, or motor impairments, and for those unfamiliar with a site, these safeguards are what make input interfaces actually usable.",
        criteria:[
          { title:"Clearly identify errors", level:"A/AA", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/error-identification", tags:["3.3.1: Error identification","3.3.2: Labels or instructions"], tagLinks:[{ label:"3.3.1 Error Identification", url:"https://www.w3.org/WAI/WCAG22/Understanding/error-identification" },{ label:"3.3.2 Labels or Instructions", url:"https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions" }], body:"When errors occur, they should be identified and described in text, not just flagged with color or an icon. Clear labels and instructions should accompany every input field, explaining what\'s needed and how to enter it.\n\nThat full loop of guidance, before input and after, is especially important for users with cognitive disabilities, visual impairments, or those who aren\'t familiar with a specific format or form convention. Users should never have to guess what goes in an input field, and they should never be left wondering what went wrong after submitting one.", examples:[{ title:"Form validation error", desc:"An error must be described in text, not indicated by color alone, and should suggest how to correct it.", dont:{ caption:"Don\'t use a red border alone to mark an invalid field — users with color vision deficiency won\'t perceive the error, and screen reader users won\'t hear it." }, do:{ caption:"Do add an error message directly below the invalid field explaining what went wrong: \'Email address is required\' tells users exactly what to correct." } }] },
          { title:"3.3.3 Error Suggestion", level:"AA", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion", tags:["3.3.3: Error suggestion"], body:"This guideline focuses on ensuring that when an input error is detected, users are given clear suggestions for how to fix it, unless providing that guidance would compromise security or the integrity of the content. That kind of specific, actionable feedback is especially valuable for users with cognitive disabilities, learning disabilities, or those unfamiliar with the format or requirements of a given field.", examples:[{ title:"Visible input labels", desc:"Placeholder text inside an input field disappears when typing, leaving users with no label to reference if they forget what is expected.", dont:{ caption:"Don\'t rely on placeholder text as the only label for an input — it disappears on focus, leaving users with cognitive disabilities no reference while they type." }, do:{ caption:"Do use a persistent, visible label above every input field so users always know what information is expected, even while they are typing." } }] },
          { title:"3.3.4 Error Prevention (Legal, Financial, Data)", level:"AA", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data", tags:["3.3.4: Error prevention"], body:"When designing interfaces that involve the input of legal or financial information, it\'s crucial to implement measures that help prevent errors. Ensure that users are provided with clear instructions and validation messages throughout the data entry process. Offer confirmation dialogues before finalizing transactions to allow users to review their information.", examples:[{ title:"Checkout confirmation step", desc:"A payment flow must give users an opportunity to review their order before it is submitted.", dont:{ caption:"Don\'t finalize a purchase or irreversible action with a single tap — users with motor impairments may activate it accidentally with no recovery path." }, do:{ caption:"Do include a review and confirm step before any irreversible action, especially for financial, legal, or data-deletion flows." } }] },
          { title:"3.3.7 Redundant Entry", level:"A", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry", tags:["3.3.7: Redundant entry"], body:"When designing multi-step processes, avoid asking users to re-enter the same information within the same task or session. Instead, auto-fill information or provide options like checkboxes and drop-downs to reuse previously entered data. This reduces cognitive load and prevents users from making mistakes.", examples:[{ title:"Pre-filled billing address", desc:"A checkout flow that asks for shipping address and then asks for billing address should offer to copy the shipping address.", dont:{ caption:"Don\'t ask users to re-type their address on the billing screen after they already entered it for shipping — every extra entry is a barrier for users with motor or cognitive disabilities." }, do:{ caption:"Do offer a \'Same as shipping address\' checkbox so users can reuse information they already provided without re-entering it." } }] },
          { title:"3.3.8 Accessible Authentication (Minimum)", level:"AA", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum", tags:["3.3.8: Accessible authentication (minimum)"], body:"This guideline focuses on ensuring that logging in doesn\'t become a barrier for users with memory, attention, or comprehension difficulties. Authentication processes should not rely solely on cognitive tests like remembering or transcribing characters. Instead, provide alternatives: password manager support, biometric options like fingerprint or facial recognition, or multi-factor authentication that simply requires entering a received code.", examples:[{ title:"Login without memorization", desc:"A login screen that requires only a typed password excludes users who cannot reliably recall or type complex strings.", dont:{ caption:"Don\'t make password recall the only login method — cognitive disabilities, memory conditions, and motor impairments all make password entry unreliable." }, do:{ caption:"Do offer alternatives like passkeys, magic links, biometric login, or copy-paste-friendly OTPs so authentication doesn\'t rely on a user\'s ability to recall and type from memory." } }] }
        ]
      }]}
    ],
    quiz: QUIZZES[4]
  },
  { id:5, title:"WCAG principles | Robust", emoji:"🔧",
    pages:[
      { sections:[
        { type:"guideline-cards",
          heading:"4. Robust",
          href:"https://www.w3.org/TR/WCAG22/#robust",
          intro:["This principle ensures that content is robust enough to be interpreted by a wide variety of current and future technologies, including assistive tools. Every interactive element must expose its name, role, and value so screen readers, voice control, and switch access can all operate it reliably. There is 1 guideline to follow and in the next pages, we will explain how you can design with this guideline in mind:"],
          cards:[
            { title:"Compatible", desc:"Content must be robust enough to be reliably interpreted by a wide variety of assistive technologies." }
          ]
        }
      ]},
      { sections:[{ type:"guideline-detail",
        heading:"4.1 Compatible",
        headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/compatible",
        intro:"This guideline focuses on ensuring web content is compatible with current and future user tools, particularly assistive technologies. That means content needs to be properly structured and coded, with correct parsing, accurate names and roles for UI elements, and status messages that can be determined programmatically. For users with disabilities who rely on these technologies to navigate and interact with digital content, this kind of under-the-hood precision is what makes the difference between content that works and content that doesn\'t.",
        criteria:[
          { title:"Avoid being platform-specific", level:"A", tags:["4.1.2: Name, role, value"], body:"Users who use assistive technologies may not be able to tap or click to perform a function. Every interactive element must have a programmatically determinable name, role, and value.", examples:[{ title:"Icon-only button", desc:"A button that only contains an icon has no visible text label. Without an accessible name, screen readers announce it as \'button\' with no context.", dont:{ caption:"Don\'t spec an icon-only button without annotating an accessible name — screen reader users will hear \'button\' with no indication of what it does." }, do:{ caption:"Do annotate every icon-only button in your design handoff with an explicit accessible name (e.g., aria-label: \'Close dialog\') so developers can implement it correctly." } }] }
        ]
      }]}],
    quiz: QUIZZES[5]
  },
  { id:6, title:"You Actually Know This Now", emoji:"✅",
    pages:[
      { sections:[{ type:"text", heading:"You Actually Know This Now", body:[
        "Nobody finishes an accessibility training and suddenly becomes a different designer overnight. But you do finish it knowing things you didn't before, and that part matters.",
        "You've been through contrast ratios, color blindness, keyboard navigation, alt text, inclusive design, data visualization, WCAG criteria. Not as abstract concepts. As decisions you make in Figma every time you pick a color, lay out a page, or write a label."
      ]}]},
      { sections:[{ type:"text", heading:"What actually stuck", body:[
        "Contrast ratios aren't magic numbers from a compliance doc. They're the gap between someone being able to read your UI at a coffee shop versus squinting and giving up. Color can't carry the whole message on its own because for a chunk of your users it literally isn't there. Alt text that says \"image of a house\" helps nobody. Reading order is a layout decision, even when it doesn't feel like one.",
        "You know this stuff now. It'll start showing up in how you look at other people's designs too, which is a little annoying but mostly useful."
      ]}]},
      { sections:[{ type:"text", heading:"Where you actually have influence", body:[
        "Most of the accessibility characteristics of a product are decided at the design stage. Not in QA. Not in a legal review. In Figma, before anyone writes a line of code. The color you chose, the layout you built, whether the error state communicates something beyond just turning red.",
        "That's a real amount of influence. More than most people realize when they're in the middle of a sprint."
      ]}]},
      { sections:[{ type:"text", heading:"A gut check before you ship", body:[
        "Does this work without color as the only signal? Would someone looking at a grayscale version of this screen still understand what's required, what's broken, what's selected?",
        "Is there anything image-only that needs a text equivalent?",
        "Does the layout hold at 400% zoom, or does it fall apart?",
        "Does the reading order match the actual sequence of information on the page?",
        "Not a perfect checklist. Just four questions worth asking before you hand something off."
      ]}]},
      { sections:[
        { type:"text", heading:"One more thing", body:[
          "Accessibility is a commitment in Haven, not a checklist item. This course is 7 modules right now, but the plan is to keep building it out. More criteria, more real examples, more of the specifics that actually show up in our work at Realtor.com. The goal is that this stays useful to you, not just something you completed once.",
          { parts: [{ text: "Coming up:", semibold: true }, { text: " guidance on the accessibility documentation in ZeroHeight and accessibility practices in Figma for the new Haven library." }] }
        ]},
        { type:"confluence-link",
          title:"Want this content as a document?",
          text:"We've got you covered. Here's the ",
          linkText:"full course content on Confluence",
          href:"https://moveinc.atlassian.net/wiki/spaces/systems/pages/118882533466",
          textAfter:", all guidelines, success criteria, and examples in one place, easy to reference anytime!"
        }
      ]}
    ],
    quiz: null
  }
];