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
                { title:"Icon buttons", image:"/Images/Perceivable/icon-button.svg", imageInteraction:"/Images/Perceivable/icon-button-interaction.svg", desc:"An icon button that lacks a visible label must have an accessible name that clearly describes its intended action, not merely its visual appearance. Without an accessible name:", descItems:["Screen reader users will not understand the button's purpose.","Other users who may not recognize the icon's meaning will also be unclear about the button's function."], descFooter:"Pro Tip: Display the accessible name in a tooltip that appears upon hover and focus.", dont:{ caption:"Don't use an icon button without an accessible name — screen readers will announce it by its file name or skip it entirely." }, do:{ caption:"Do add an aria-label that describes the button's action, such as 'Close dialog' or 'Share to Twitter'." } },
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
          { title:"1.4.3 Contrast (Minimum)", level:"AA", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum", tags:["1.4.3: Contrast (minimum)"], body:"Text and other important UI elements must have sufficient contrast with its background to ensure readability and accessibility, with the required ratio depending on the font size or type of element.", bodyItems:["Normal: Text smaller than 24px (regular), or smaller than 18px (bold) requires a minimum contrast ratio of 4.5:1.","Large: Text that is bigger than 24px (regular), or bigger than 18px (bold) requires a minimum contrast ratio of 3:1.","User Interface Components & Graphics: Minimum 3:1 ratio for components like buttons or input borders.","Exceptions: Logotypes, and purely decorative elements are exempt."], bodyNote:["Pro Tip: Always use the design system's semantic tokens for colors and avoid altering the colors on existing components. These components have been designed with accessibility guidelines, including color contrast, already met. If you are designing a new pattern that introduces colors, you must always double-check the color contrast using a tool like the Stark plugin for Figma: ",{ text:"Start", href:"https://www.figma.com/community/plugin/732603254453395948/stark-contrast-accessibility-checker" },"."], },

          { title:"1.4.4 Resize Text", level:"AA", titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/resize-text", tags:["1.4.4: Resize text"], body:"Text should be resizable up to 200% without loss of content or functionality. This is essential for users with low vision or those who find small text challenging to read, making digital experiences more accessible and user-friendly.", examples:[{ title:"Resize Text", descFooter:"Pro Tip: To ensure a good experience for users who zoom, always design two views for each screen: one with the default text scale and one with text scaled to 200%. This practice allows you to adjust the UI layout, preventing element overlap and ensuring the text wraps correctly at larger sizes.", image:"/Images/Perceivable/Resize Text 1.svg", imageLabel:"Default text scale", imageInteraction:"/Images/Perceivable/Resize Text 2.svg", imageInteractionLabel:"Text scaled to 200%", imageAlignTop: true }] },
          { title:"Ensure accessible content reflow", level:"AA", tags:["1.4.10: Reflow"], body:"Design content that can be enlarged up to 400% without requiring horizontal scrolling.", examples:[{ title:"Responsive zoom layout", desc:"At 400% zoom, a single-column linear layout should emerge naturally from the responsive design.", dont:{ caption:"Don't use fixed-width layouts that force horizontal scrolling at high zoom — this creates a significant barrier for low-vision users." }, do:{ caption:"Do design mobile-first responsive layouts that reflow to a single column, ensuring all content is accessible at 400% zoom." } }] },
          { title:"Respect non-text elements contrast ratio", level:"AA", tags:["1.4.11: Non-text contrast"], body:"For every actionable or critical element make sure there is enough contrast (3:1) for it to be easily distinguishable.", examples:[{ title:"Input field border", desc:"The border or outline of a form input must have sufficient contrast against its background to be clearly visible.", dont:{ caption:"Don't use a light gray border on a white background for inputs — the boundary becomes invisible to users with low contrast sensitivity." }, do:{ caption:"Do ensure input borders, icons, and UI component boundaries meet a 3:1 contrast ratio against adjacent colors." } }] },
          { title:"Allow users to adjust text spacing", level:"AA", tags:["1.4.12: Text spacing"], body:"Ensure that increased line, word, or letter spacing doesn't break the layout or hide content.", examples:[{ title:"Text spacing override", desc:"When users apply custom text spacing via a browser extension or accessibility setting, no content should be cut off.", dont:{ caption:"Don't use fixed-height containers around text — when users increase line height, text overflows and gets clipped." }, do:{ caption:"Do use min-height or let containers grow with content so text remains visible when spacing is increased." } }] },
          { title:"Design accessible hover and focus content", level:"AA", tags:["1.4.13: Content on hover or focus"], body:"Hover-triggered or focus-triggered content like tooltips must be dismissable, hoverable, and persistent.", examples:[{ title:"Tooltip behavior", desc:"A tooltip triggered by hovering over an icon must be dismissable, remain visible when hovered, and persist until dismissed.", dont:{ caption:"Don't build tooltips that disappear immediately when the cursor moves slightly — users with motor impairments can't keep the hover steady." }, do:{ caption:"Do keep tooltip content visible as long as the cursor is within the trigger area, and allow dismissal with the Escape key." } }] }
        ]
      }]}
    ],
    quiz: QUIZZES[2]
  },
  { id:3, title:"WCAG principles | Operable", emoji:"⌨️",
    pages:[
      { sections:[
        { type:"guideline-cards",
          heading:"Operable Guidelines",
          href:"https://www.w3.org/TR/WCAG22/#operable",
          intro:["This principle ensures that all users can interact with your interface, regardless of how they navigate. Whether someone uses a keyboard, switch device, voice control, or touch, every function must be reachable and operable. There are 5 guidelines to follow and in the next pages, we will explain how you can design with these guidelines in mind:"],
          cards:[
            { title:"Keyboard accessible", desc:"All functionality must be operable through a keyboard interface without requiring specific timing." },
            { title:"Enough time",         desc:"Users must be given enough time to read and interact with content." },
            { title:"Seizures and physical reactions", desc:"Content must not be designed in a way that is known to cause seizures or physical reactions." },
            { title:"Navigable",           desc:"Users must be able to navigate, find content, and determine where they are." },
            { title:"Input modalities",    desc:"Users must be able to operate functionality through various input methods beyond keyboard and mouse." }
          ]
        }
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"Keyboard accessible",
          intro:"All functionality must be operable through a keyboard interface. Users who cannot use a mouse rely entirely on keyboard navigation — this includes people using switch access, voice control, or screen readers.",
          criteria:[
            { title:"Allow users to exit a situation", level:"A", tags:["2.1.2: No keyboard trap"], body:"Enable users to easily get out of a situation by providing a clear closing option. Users should never become stuck inside a modal, dropdown, or interactive widget with no way out.", examples:[{ title:"Keyboard trap in a modal", desc:"A modal dialog that traps keyboard focus must always provide a way to dismiss it without using a mouse.", dont:{ caption:"Don't open a modal with no close button or Escape key handling — keyboard users become trapped inside with no way out." }, do:{ caption:"Do include a visible close button and support the Escape key so keyboard users can always dismiss the modal and return focus to the trigger." } }] },
            { title:"Ensure accessibility in shortcuts", level:"A", tags:["2.1.4: Character key shortcuts"], body:"Provide users the option to disable or customize keyboard shortcuts. Make shortcuts context-dependent and offer clear feedback with undo options.", examples:[{ title:"Single-key shortcut conflict", desc:"A single-character shortcut like 'S' can fire accidentally for a screen reader user navigating by typing letters to jump to elements.", dont:{ caption:"Don't implement single-character keyboard shortcuts without providing a way to disable or remap them — voice control users may trigger them unintentionally." }, do:{ caption:"Do offer a settings option to turn off or remap single-character shortcuts, or scope them so they only activate when focus is on the relevant component." } }] }
          ]
        },
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"Enough time",
          intro:"Users must be given enough time to read and interact with content. Time limits can create barriers for users who read slowly, have motor impairments, or use assistive technologies that require more time to operate.",
          criteria:[
            { title:"Extend time-dependent functionalities", level:"A", tags:["2.2.1: Timing adjustable"], body:"If you have time-dependent content (e.g. security tokens), users should see the time remaining and have an option to extend it.", examples:[{ title:"Session timeout warning", desc:"When a session is about to expire, users must be warned in advance and given the option to extend it.", dont:{ caption:"Don't silently expire a session without warning — screen reader users or slow typists may lose their progress without ever knowing a timer was running." }, do:{ caption:"Do show a timeout warning at least 20 seconds before expiry and provide a clearly labeled option to extend the session." } }] },
            { title:"Include option to turn off automatic updates", level:"A", tags:["2.2.2: Pause, stop, hide"], body:"If you have content that moves or updates automatically, users need to have an option to pause, hide or stop this movement.", examples:[{ title:"Auto-advancing carousel", desc:"A banner that cycles through slides automatically must provide controls for users to pause or stop the movement.", dont:{ caption:"Don't auto-advance a carousel with no pause control — users with cognitive disabilities or those using screen readers need time to read each slide before it changes." }, do:{ caption:"Do include a pause button on any auto-advancing content so users can stop movement and review the content at their own pace." } }] }
          ]
        }
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"Seizures and physical reactions",
          intro:"Designs must avoid content that could trigger physical reactions. Flashing or strobing visuals can provoke seizures in people with photosensitive epilepsy — even a single page visit can cause harm.",
          criteria:[
            { title:"Reduce blinking and flashing elements", level:"A", tags:["2.3.1: Three flashes or below threshold"], body:"Avoid using flashing elements that may provoke seizures. If you use flashing elements, make sure the flash rate is 3 times per second or less.", examples:[{ title:"Attention-grabbing animation", desc:"Rapid flashing or strobing effects used for emphasis are a direct risk to users with photosensitive epilepsy.", dont:{ caption:"Don't use rapid flashing animations to draw attention — content that flashes more than 3 times per second can trigger seizures." }, do:{ caption:"Do use subtle, slow transitions or static emphasis instead of flashing. If animation is necessary, keep it below 3 flashes per second and cover less than 25% of the viewport." } }] }
          ]
        },
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"Navigable",
          intro:"Users must be able to navigate, find content, and determine where they are. Good navigation structure helps everyone — and is essential for keyboard users, screen reader users, and people with cognitive disabilities.",
          criteria:[
            { title:"Skip repetitive content blocks", level:"A", tags:["2.4.1: Bypass blocks"], body:"Have an option to skip repetitive content that repeats on every page so screen reader users can bypass those blocks to get to the main content.", examples:[{ title:"Skip navigation link", desc:"A 'Skip to main content' link at the top of each page lets keyboard users bypass repeated navigation menus.", dont:{ caption:"Don't force keyboard users to tab through a 12-item navigation menu and cookie banner on every single page before reaching the main content." }, do:{ caption:"Do add a visually hidden 'Skip to main content' link as the first focusable element so keyboard users can jump straight to the page content." } }] },
            { title:"Include a page title", level:"A", tags:["2.4.2: Page titled"], body:"Ensure all pages and screens have a title that accurately represents the content the user is viewing.", examples:[{ title:"Unique page titles", desc:"Each page or screen must have a distinct, descriptive title so users always know where they are.", dont:{ caption:"Don't use the same generic title like 'My App' on every page — screen reader users announce the page title on load and rely on it for orientation." }, do:{ caption:"Do write descriptive, unique titles for every page using the pattern 'Page name — App name' so context is immediately clear." } }] },
            { title:"Define focus states and their order", level:"AA", tags:["2.4.3: Focus order","2.4.7: Focus visible","2.4.11: Focus not obscured"], body:"Define focus states for actionable elements and work with developers on the focus order. Keep focused elements visible and avoid obstruction by modals or toolbars.", examples:[{ title:"Sticky header obscuring focus", desc:"A sticky navigation bar or floating toolbar can overlap the focused element, making it invisible to keyboard users.", dont:{ caption:"Don't let a sticky header cover the focused element — keyboard users lose track of where they are on the page." }, do:{ caption:"Do account for sticky elements in layout and ensure focused items always remain fully visible, never obscured by fixed UI." } }] },
            { title:"Ensure the purpose of a link or button is clear", level:"A", tags:["2.4.4: Link purpose (in context)"], body:"Avoid ambiguous links or buttons. Be more descriptive so that the purpose could be understood by the text alone.", examples:[{ title:"Generic 'Read more' links", desc:"Multiple 'Read more' links on a page all sound identical to a screen reader user scanning links out of context.", dont:{ caption:"Don't label multiple links 'Read more' or 'Click here' — screen reader users navigating by links hear a list of meaningless identical text." }, do:{ caption:"Do write descriptive link text that identifies the destination or action: 'Read the WCAG 2.2 overview' communicates purpose without surrounding context." } }] },
            { title:"Design for diverse navigation methods", level:"AA", tags:["2.4.5: Multiple ways"], body:"Ensure your app offers multiple ways to access content: a search bar, a categorical navigation menu, and quick-access files.", examples:[{ title:"Search plus structured navigation", desc:"Users should be able to reach any content through at least two routes — such as a navigation menu and a search bar.", dont:{ caption:"Don't rely on a single navigation path to access all content — users with cognitive disabilities or those lost in a hierarchy benefit from search as an alternative route." }, do:{ caption:"Do provide both structured navigation (menus, categories) and a search function so users can find content using whichever method works best for them." } }] },
            { title:"Group content for better screen reader navigation", level:"AA", tags:["2.4.6: Headings and labels"], body:"Aim to have distinctive groups of items, where each group has its own heading. Mark non-visual headings in your design file.", examples:[{ title:"Annotating semantic headings", desc:"Headings that look visually large but are marked as divs in code provide no navigation landmarks for screen readers.", dont:{ caption:"Don't use Display text styles on divs without annotating the intended heading level — developers will implement plain text and screen reader users lose all heading structure." }, do:{ caption:"Do annotate every section heading in your design file with its semantic level (H1–H6) so developers implement the correct hierarchy for screen reader navigation." } }] }
          ]
        }
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"Input modalities",
          intro:"Users must be able to interact with content through a variety of input methods beyond keyboard and mouse — including touch, voice, and switch controls. Designs must not assume a specific input device.",
          criteria:[
            { title:"Simplify touchscreen gestures", level:"A", tags:["2.5.1: Pointer gestures"], body:"All touchscreen functions should be operated with simple, single-point gestures like taps or clicks, instead of complex multi-touch gestures.", examples:[{ title:"Swipe to dismiss with no tap alternative", desc:"A swipe-to-dismiss gesture for notifications is not accessible to users who cannot perform multi-directional gestures.", dont:{ caption:"Don't make swipe the only way to dismiss or interact with an element — users with motor impairments who use single-tap switch access have no alternative." }, do:{ caption:"Do always provide a tap-based alternative alongside any swipe or complex gesture so all users can access the same functionality." } }] },
            { title:"Align labels and controls", level:"A", tags:["2.5.3: Label in name"], body:"Ensure that the visible text on buttons, links, and inputs matches the programmatic names used by assistive technologies.", examples:[{ title:"Icon button with mismatched label", desc:"A button that visually reads 'Search' but has an aria-label of 'Open query field' creates a mismatch that breaks voice control.", dont:{ caption:"Don't give a control a different accessible name than its visible label — voice control users say what they see, and a mismatch means the command won't trigger." }, do:{ caption:"Do ensure the accessible name starts with or exactly matches the visible label text so voice control users can activate any control by speaking what they read." } }] },
            { title:"Avoid drag-only actions", level:"AA", tags:["2.5.7: Dragging movements"], body:"Provide alternatives to dragging actions. Offer simple, single-pointer options like clicks or taps to help users with mobility impairments.", examples:[{ title:"Drag-to-reorder list", desc:"A list that can only be reordered by dragging is inaccessible to users who cannot perform a sustained click-and-drag motion.", dont:{ caption:"Don't make drag the only way to reorder, resize, or move elements — users with motor impairments or tremors cannot reliably perform a sustained drag." }, do:{ caption:"Do provide a single-tap or click-based alternative for any drag interaction, such as arrow buttons to reorder list items or handles with keyboard support." } }] },
            { title:"Ensure touch-target area is big enough", level:"AA", tags:["2.5.8: Target size (minimum)"], body:"Aim to have at least 48px width and 48px height for touch targets. Ensure clickable elements are separated by 8px or more.", examples:[{ title:"Small icon buttons in a toolbar", desc:"Toolbar icons that are 20×20px have a visual footprint too small for reliable tapping, especially for users with motor impairments.", dont:{ caption:"Don't use 20px or 24px tap targets for icon buttons — they are too small for users with reduced motor control to reliably hit, causing mis-taps." }, do:{ caption:"Do set a minimum 48×48px tap target for all interactive elements, even when the visual icon is smaller. Use padding to expand the hit area without changing the visual design." } }] }
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
          heading:"Understandable Guidelines",
          href:"https://www.w3.org/TR/WCAG22/#understandable",
          intro:["This principle ensures that information and the operation of the interface is understandable. Content must be readable, interfaces must behave predictably, and users must be helped to avoid and correct mistakes. There are 3 guidelines to follow and in the next pages, we will explain how you can design with these guidelines in mind:"],
          cards:[
            { title:"Readable",          desc:"Content must be readable and understandable, with language attributes that assistive technologies can use." },
            { title:"Predictable",       desc:"Web pages must appear and operate in predictable ways so users always know what to expect." },
            { title:"Input assistance",  desc:"Users must be helped to avoid and correct mistakes when providing input." }
          ]
        }
      ]},
      { sections:[{ type:"guideline-detail",
        heading:"Readable",
        intro:"Content must be readable and understandable to all users. This includes setting language attributes that assistive technologies rely on, and writing in plain language that reduces cognitive load.",
        criteria:[
          { title:"Present language selection upfront", level:"A", tags:["3.1.1: Language of page","3.1.2: Language of parts"], body:"If your product supports multiple languages, make sure language selection is presented upfront before the user can continue interacting.", examples:[{ title:"Language selection on first use", desc:"If content is available in multiple languages, the language selection must be one of the first interactions — not buried in settings.", dont:{ caption:"Don't default to a single language without offering a selection screen — screen readers use the page language to determine pronunciation, and wrong language settings produce garbled output." }, do:{ caption:"Do present a clear language selector on first load or onboarding so users can set their preferred language before engaging with any content." } }] },
          { title:"Simplify content", level:"AAA", tags:["3.1.5: Reading level"], body:"Use simple sentences and communicate in a conversational tone. By using simple sentence formulation, content is understood faster and more easily.", examples:[{ title:"Plain language in error messages", desc:"Error messages written in technical jargon are inaccessible to users with lower reading levels or cognitive disabilities.", dont:{ caption:"Don't write error messages like 'An unhandled exception occurred during form validation' — most users cannot parse technical language under stress." }, do:{ caption:"Do write error messages in plain language: 'Your password must be at least 8 characters' tells users exactly what to fix without requiring technical knowledge." } }] }
        ]
      }]},
      { sections:[{ type:"guideline-detail",
        heading:"Predictable",
        intro:"Interfaces must behave in ways users expect. Unexpected context changes, inconsistent navigation, and unpredictable component behavior all create barriers — especially for users with cognitive disabilities or those relying on screen readers.",
        criteria:[
          { title:"Don't change context without user confirmation", level:"A", tags:["3.2.1: On focus","3.2.2: On input"], body:"Context of the page shouldn't be changed without user confirming it. Before any change happens, there needs to be a clear question and an option the user can choose from.", examples:[{ title:"Auto-submitting dropdown", desc:"A dropdown that immediately navigates to a new page the moment an option is selected creates an unexpected context change.", dont:{ caption:"Don't trigger a page navigation or form submission automatically when a user selects a dropdown option — this disorients screen reader users who are still exploring." }, do:{ caption:"Do require a separate confirm action (like a 'Go' button) after a selection so users can review their choice and consciously trigger the change." } }] },
          { title:"Make navigation predictable and consistent", level:"AA", tags:["3.2.3: Consistent navigation"], body:"Ensure consistent navigation across all pages by placing menus, buttons, and repeated elements in the same order.", examples:[{ title:"Navigation order across screens", desc:"If the search icon appears after the profile icon on one screen, it should appear in the same position on all screens.", dont:{ caption:"Don't reorder navigation items or move global controls between screens — users with cognitive disabilities build mental maps that break when layout is inconsistent." }, do:{ caption:"Do maintain the same visual and focus order for all recurring navigation elements across every screen in your product." } }] },
          { title:"Stay consistent for improved accessibility", level:"AA", tags:["3.2.4: Consistent identification"], body:"Create a style guide with standardized labels and text alternatives for similar functions. Use clear, uniform language.", examples:[{ title:"Submit button label consistency", desc:"Calling the same action 'Submit', 'Send', and 'Confirm' on different forms confuses users who expect consistent labeling.", dont:{ caption:"Don't use different labels for the same function across your product — inconsistency forces users to re-evaluate familiar patterns each time." }, do:{ caption:"Do define a vocabulary in your design system: one label per function, applied consistently everywhere, so users immediately recognize familiar controls." } }] },
          { title:"Keep help options consistent across your design", level:"A", tags:["3.2.6: Consistent help"], body:"Ensure that help options such as contact links, chatbots, or support pages are consistently positioned in your design.", examples:[{ title:"Help link position across pages", desc:"A 'Contact support' link that appears in the footer on some pages and in the header on others is harder to find in a moment of need.", dont:{ caption:"Don't move help resources to different locations between pages — users who need help are already under cognitive load and shouldn't have to search for it." }, do:{ caption:"Do place help options (chat, support link, FAQ) in the same position on every page so users can find assistance predictably without additional effort." } }] }
        ]
      }]},
      { sections:[{ type:"guideline-detail",
        heading:"Input assistance",
        intro:"Users must be helped to avoid and correct mistakes. Error prevention and clear guidance are especially important for users with cognitive disabilities, learning differences, or motor impairments who may find correcting errors difficult.",
        criteria:[
          { title:"Clearly identify errors", level:"A", tags:["3.3.1: Error identification","3.3.3: Error suggestion"], body:"Clearly indicate where and what type of error took place. Focus the element in question, provide an error text next to it and describe what the issue is.", examples:[{ title:"Form validation error", desc:"An error must be described in text, not indicated by color alone, and should suggest how to correct it.", dont:{ caption:"Don't use a red border alone to mark an invalid field — users with color vision deficiency won't perceive the error, and screen reader users won't hear it." }, do:{ caption:"Do add an error message directly below the invalid field explaining what went wrong: 'Email address is required' tells users exactly what to correct." } }] },
          { title:"Provide labels and cues to avoid mistakes", level:"A", tags:["3.3.2: Labels or instructions"], body:"Avoid user mistakes by adding simple instructions or cues so users understand what is asked of them. Always use visible labels.", examples:[{ title:"Visible input labels", desc:"Placeholder text inside an input field disappears when typing, leaving users with no label to reference if they forget what is expected.", dont:{ caption:"Don't rely on placeholder text as the only label for an input — it disappears on focus, leaving users with cognitive disabilities no reference while they type." }, do:{ caption:"Do use a persistent, visible label above every input field so users always know what information is expected, even while they are typing." } }] },
          { title:"Enable review and confirmation to prevent mistakes", level:"AA", tags:["3.3.4: Error prevention"], body:"When designing interfaces that involve legal or financial information, provide clear instructions and offer confirmation dialogues before finalizing transactions.", examples:[{ title:"Checkout confirmation step", desc:"A payment flow must give users an opportunity to review their order before it is submitted.", dont:{ caption:"Don't finalize a purchase or irreversible action with a single tap — users with motor impairments may activate it accidentally with no recovery path." }, do:{ caption:"Do include a review and confirm step before any irreversible action, especially for financial, legal, or data-deletion flows." } }] },
          { title:"Avoid redundant entries in multi-step processes", level:"A", tags:["3.3.7: Redundant entry"], body:"Avoid asking users to re-enter the same information within the same session. Auto-fill information or provide options to reuse previously entered data.", examples:[{ title:"Pre-filled billing address", desc:"A checkout flow that asks for shipping address and then asks for billing address should offer to copy the shipping address.", dont:{ caption:"Don't ask users to re-type their address on the billing screen after they already entered it for shipping — every extra entry is a barrier for users with motor or cognitive disabilities." }, do:{ caption:"Do offer a 'Same as shipping address' checkbox so users can reuse information they already provided without re-entering it." } }] },
          { title:"Provide accessible authentication options", level:"AA", tags:["3.3.8: Accessible authentication (minimum)"], body:"For authentication always provide alternative identification methods, both biometric and non-biometric. Authentication should not require cognitive function tests like recalling passwords.", examples:[{ title:"Login without memorization", desc:"A login screen that requires only a typed password excludes users who cannot reliably recall or type complex strings.", dont:{ caption:"Don't make password recall the only login method — cognitive disabilities, memory conditions, and motor impairments all make password entry unreliable." }, do:{ caption:"Do offer alternatives like passkeys, magic links, biometric login, or copy-paste-friendly OTPs so authentication doesn't rely on a user's ability to recall and type from memory." } }] }
        ]
      }]}
    ],
    quiz: QUIZZES[4]
  },
  { id:5, title:"WCAG principles | Robust", emoji:"🔧",
    pages:[
      { sections:[
        { type:"guideline-cards",
          heading:"Robust Guidelines",
          href:"https://www.w3.org/TR/WCAG22/#robust",
          intro:["This principle ensures that content is robust enough to be interpreted by a wide variety of current and future technologies, including assistive tools. Every interactive element must expose its name, role, and value so screen readers, voice control, and switch access can all operate it reliably. There is 1 guideline to follow and in the next pages, we will explain how you can design with this guideline in mind:"],
          cards:[
            { title:"Compatible", desc:"Content must be robust enough to be reliably interpreted by a wide variety of assistive technologies." }
          ]
        }
      ]},
      { sections:[{ type:"guideline-detail",
        heading:"Compatible",
        intro:"Content must be robust enough to be interpreted by a wide variety of current and future assistive technologies. This means every interactive element must expose its name, role, and value so that screen readers, voice control, and switch access can all operate it reliably.",
        criteria:[
          { title:"Avoid being platform-specific", level:"A", tags:["4.1.2: Name, role, value"], body:"Users who use assistive technologies may not be able to tap or click to perform a function. Every interactive element must have a programmatically determinable name, role, and value.", examples:[{ title:"Icon-only button", desc:"A button that only contains an icon has no visible text label. Without an accessible name, screen readers announce it as 'button' with no context.", dont:{ caption:"Don't spec an icon-only button without annotating an accessible name — screen reader users will hear 'button' with no indication of what it does." }, do:{ caption:"Do annotate every icon-only button in your design handoff with an explicit accessible name (e.g., aria-label: 'Close dialog') so developers can implement it correctly." } }] }
        ]
      }]}],
    quiz: QUIZZES[5]
  },
  { id:6, title:"Accessibility in Figma", emoji:"✏️",
    pages:[
      { sections:[
        { type:"text", heading:"Your role starts in the file", body:"Accessibility decisions made in Figma, or skipped there, directly affect what gets built. The earlier accessibility is considered, the cheaper and faster it is to fix." },
        { type:"plugin-cards", heading:"Essential Figma plugins", plugins:[
          { name:"Able",                icon:"🔍", use:"Contrast checker that works inline as you design. Essential for color decisions." },
          { name:"A11y Annotation Kit", icon:"🏷️", use:"Official annotation library for adding accessibility specs to handoff files." },
          { name:"Stark",               icon:"⚡", use:"Full a11y suite: contrast, vision simulator, focus order, and alt text." },
          { name:"Color Blind",         icon:"👁️", use:"Simulates 8 types of color vision deficiency across your entire frame." }
        ]}
      ]},
      { sections:[
        { type:"annotation-guide", heading:"Annotating for handoff", body:"When you hand off designs, developers need more than visual specs. Include these accessibility annotations in every handoff:", items:[
          { icon:"🏷️", label:"Reading order",    desc:"Number elements in the intended focus/reading sequence" },
          { icon:"🖼️", label:"Alt text",          desc:"Write descriptive alt text for all meaningful images; mark decorative images" },
          { icon:"🎯", label:"Interactive role",  desc:"Label components: button, link, checkbox, radio, etc." },
          { icon:"⌨️", label:"Keyboard behavior", desc:"Note expected keyboard interactions (Enter to confirm, Esc to close, etc.)" },
          { icon:"🔊", label:"ARIA labels",        desc:"Specify accessible names for icon-only buttons and unlabeled inputs" }
        ]},
        { type:"naming-guide", heading:"Layer naming matters", body:"Semantic layer names in Figma improve communication with developers. Follow these conventions:", rules:[
          { do:"Button/Primary/Default",       dont:"Rectangle 12" },
          { do:"Icon/ArrowRight (decorative)",  dont:"arrow-icon-2-final" },
          { do:"Heading/Display500",           dont:"text copy here" },
          { do:"Input/Email/Error",            dont:"group 47" }
        ]}
      ]}
    ],
    quiz: QUIZZES[6]
  },
  { id:7, title:"Design system & Storybook", emoji:"🧩",
    pages:[
      { sections:[
        { type:"text", heading:"Accessibility is built in, but it's your job to use it correctly", body:"Our design system components are built to be accessible out of the box. But they can still be misused in ways that break accessibility." },
        { type:"storybook-guide", heading:"Using Storybook for accessibility", body:"Every component in our Storybook includes an Accessibility tab powered by the axe-core engine. Before handing off a new pattern:", steps:[
          { num:"01", title:"Find the component",                desc:"Locate the closest matching component in Storybook before designing a custom solution." },
          { num:"02", title:"Check the Accessibility tab",       desc:"Review any existing violations or warnings. These are known issues the team is tracking." },
          { num:"03", title:"Read the usage docs",               desc:"Each component has a Usage story with do/don't guidance, including a11y-specific notes." },
          { num:"04", title:"Propose changes through the system", desc:"If a component doesn't meet a new accessibility need, open a design system ticket, don't one-off it." }
        ]}
      ]},
      { sections:[{ type:"do-dont", heading:"Common misuses to avoid", pairs:[
        { dont:"Using a div styled as a button in your design spec",            do:"Using the Button component from the system, which includes keyboard and ARIA support" },
        { dont:"Creating a custom dropdown from scratch for a one-off use case", do:"Using the Select or Combobox component, which has focus management built in" },
        { dont:"Removing the visible label from an input to save space",        do:"Using the Input component with a visible label or proper aria-label annotation" },
        { dont:"Using a Display style on a div with no semantic note",          do:"Annotating the semantic heading level (H1-H6) separately from the visual Display style" }
      ]}]}
    ],
    quiz: QUIZZES[7]
  },
  { id:8, title:"Your role & checklist", emoji:"✅",
    pages:[
      { sections:[
        { type:"text", heading:"Accessibility is everyone's responsibility, but designers set the tone", body:"By the time a design reaches engineering, most of the accessibility decisions have already been made. That means your choices in Figma have an outsized impact on the final product's inclusivity." },
        { type:"checklist-module", heading:"Designer accessibility checklist", categories:[
          { name:"Color & visual",       items:["All text meets 4.5:1 contrast ratio (3:1 for large text)","UI components (inputs, buttons, icons) meet 3:1 contrast","Color is never the sole means of conveying information","Designs reviewed under color blindness simulation"] },
          { name:"Typography & layout",  items:["Body text is Body 300 (16px) minimum","Touch/click targets are at least 48x48px","Content reflows at 400% zoom without horizontal scrolling","Text spacing can be increased without loss of functionality"] },
          { name:"Interaction & states", items:["All interactive elements have a visible focus state","Hover, focus, active, disabled, and error states are designed","Keyboard interaction annotated for complex components","Motion can be disabled (prefers-reduced-motion considered)"] },
          { name:"Handoff",              items:["Reading/focus order annotated in Figma","Alt text written for all meaningful images","ARIA labels specified for icon-only controls","Interactive element roles labeled (button, link, checkbox...)"] }
        ]}
      ]},
      { sections:[{ type:"resources", heading:"Keep learning", links:[
        { title:"WCAG 2.2 Quick Reference", url:"https://www.w3.org/WAI/WCAG22/quickref/",       desc:"Official filterable checklist from W3C" },
        { title:"WebAIM Contrast Checker",  url:"https://webaim.org/resources/contrastchecker/", desc:"Quick ratio checker for any two colors" },
        { title:"Inclusive Components",     url:"https://inclusive-components.design/",           desc:"Deep dives on designing common UI patterns accessibly" },
        { title:"A11y Project Checklist",   url:"https://www.a11yproject.com/checklist/",         desc:"Practical, plain-language WCAG checklist" }
      ]}]}
    ],
    quiz: QUIZZES[8]
  }
];
