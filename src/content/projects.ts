export type Project = {
  slug: string
  title: string
  year: string
  oneLiner: string
  heroImage?: string
  /** Optional position for hero image on project cards (e.g. "left top" to crop right/bottom and enlarge subject). */
  heroImagePosition?: 'center' | 'left top' | 'left' | 'top'
  /** When set, project card links to this URL instead of /work/[slug] */
  externalUrl?: string
  gallery?: string[]
  /** Images to show between sections. `after` = section key: problem, insight, solution, whatIBuilt, decisions, systemModes, results, iteration, outcome, learnings, status, nextSteps */
  inlineImages?: { after: string; src: string; alt?: string }[]
  /** YouTube videos to show between sections. Use video ID only (e.g. YdCnRnITyKg from youtu.be/YdCnRnITyKg). */
  inlineVideos?: { after: string; youtubeId: string }[]
  /** Local video files (e.g. /files/demo.mp4) to embed between sections. */
  inlineLocalVideos?: { after: string; src: string }[]
  role?: string
  context?: string
  // Case study sections
  problem?: string
  insight?: string
  solution?: string
  whatIBuilt?: string[]
  decisions?: string[]
  systemModes?: { name: string; items: string[] }[]
  results?: string[]
  iteration?: string[]
  outcome?: string
  learnings?: string[]
  status?: string
  nextSteps?: string[]
  links?: { label: string; href: string }[]
  tags?: string[]
}

export const projects: Project[] = [
  {
    slug: 'irix',
    title: 'IRIX — AI Personal Training on Smart Glasses',
    year: '2026',
    oneLiner:
      'AI personal training on smart glasses: workout planning, automatic tracking, and real-time audio coaching for the gym floor.',
    heroImage: '/images/projects/irix-hero.png',
    heroImagePosition: 'left top',
    inlineImages: [
      { after: 'solution', src: '/images/projects/irix-hud-ring.png', alt: 'Even G2 smart glasses on wooden surface' },
    ],
    inlineVideos: [{ after: 'problem', youtubeId: 'YdCnRnITyKg' }],
    role: 'Co-Founder & CEO',
    context: 'Jan 2026 – Present',
    tags: [
      'Smart Glasses',
      'Wearable Systems',
      'AI Agents',
      'IMU Sensing',
      'Audio-First UX',
      'Python',
      'FastAPI',
      'Swift',
      'iOS',
      'PostgreSQL',
      'AWS',
    ],
    problem:
      'Most gym-goers train without real-time guidance, structure, or feedback. Personal training solves this, but it is expensive, limited in availability, and difficult to scale. As a result, most people rely on memory, phone apps, or handwritten notes during workouts—leading to inconsistent programming, poor progression tracking, and stalled results. Phone-based fitness tools also create friction on the gym floor. They require manual logging, screen interaction between sets, and retrospective feedback rather than in-the-moment coaching. This breaks focus and increases cognitive load during training, especially for compound lifts that demand attention and intent.',
    insight:
      'The wearable-first design prioritizes low latency, minimal visual clutter, and natural interaction. Audio is the primary interface, with the HUD used only for essential context such as set progress or timers. IRIX is built as a tightly integrated wearable system rather than a rep counter or static workout planner.',
    solution:
      'IRIX is an AI personal training agent delivered through smart glasses, designed to operate directly on the gym floor. It plans workouts, tracks performance automatically, and provides real-time coaching through audio and a lightweight heads-up display—without phones, manual logging, or staff involvement. The system behaves like an always-available training partner. It guides users step-by-step through a workout, adapts instructions based on live performance data, and enforces progressive overload across sessions. By removing planning and decision-making during training, IRIX allows users to focus entirely on execution.',
    whatIBuilt: [
      'Defined the overall product architecture and wearable-first UX',
      'Designed sensing and interaction constraints for training in live gym environments',
      'Led integration with smart glasses hardware and sensor pipelines',
      'Coordinated early pilots with hardware partners and gym operators',
      'Owned decisions around deployment, reliability, and user experience under real-world constraints',
    ],
    decisions: [
      'Wearable UX limits: visual attention is scarce during lifts, so most interaction had to be audio-driven',
      'Sensor ambiguity: IMU-only rep tracking introduces noise and edge cases that required careful filtering and validation',
      'Latency vs. intelligence: real-time feedback must be fast enough to feel human, even if that means deferring heavier analysis',
      'Shared-device workflows: the system must feel personal while operating on gym-owned hardware',
      'Many early prototypes favored capability over usability; later iterations intentionally simplified outputs to preserve focus during training',
    ],
    systemModes: [
      {
        name: 'Workout planning',
        items: [
          "The AI generates daily workouts using each user's training history, goals, and progression trends",
        ],
      },
      {
        name: 'Sensing & tracking',
        items: [
          'Repetitions, tempo, and fatigue signals are detected using IMU data from smart glasses and a companion wearable',
        ],
      },
      {
        name: 'Real-time coaching',
        items: [
          'Audio guidance delivers exercise instructions, load targets, rest timing, and context-aware motivation',
        ],
      },
      {
        name: 'Persistent history',
        items: [
          'Every session updates a personalized training record used to continuously adapt future programming',
        ],
      },
      {
        name: 'Deployment model',
        items: [
          'Gyms offer IRIX as a shared amenity: members check out smart glasses at the front desk, use them during their workout, and return them when finished',
          'Mirrors existing equipment workflows; hardware partnerships handle devices while IRIX is the single software layer gyms integrate with',
        ],
      },
    ],
    results: [
      'Rep tracking validated for compound lifts including squats, deadlifts, and pull-ups',
      'Working prototypes running on head-mounted hardware and smart glasses',
      'Hardware partnership secured for smart glasses development',
      'Active conversations with gyms to launch pilot programs',
    ],
    iteration: [
      'Many early prototypes favored capability over usability; later iterations intentionally simplified outputs to preserve focus during training',
    ],
    outcome:
      'IRIX is pre-launch and pre-revenue, with pilots focused on validating reliability, engagement, and real-world deployment.',
    learnings: [
      'Visual attention is scarce during lifts—audio had to carry most of the interaction',
      'IMU-only rep tracking introduces noise and edge cases; filtering and validation are critical',
      'Real-time feedback must feel human in latency even when that defers heavier analysis',
      'Shared gym-owned hardware must still feel personal to the user',
    ],
    status:
      'Pre-launch, pre-revenue. Rep tracking validated for key compound lifts; working prototypes on head-mounted hardware; hardware partnership secured; active gym pilot conversations.',
    nextSteps: [
      'Integrate on-device sensor fusion and visual-inertial odometry as glasses hardware matures',
      'Expand adaptive coaching using longer-term fatigue and recovery modeling',
      'Scale from gym-only deployment to personal smart glasses as adoption increases',
      'Extend real-time guidance to other sports and physical skills beyond the gym',
    ],
    links: [{ label: 'Website', href: 'https://tryirix.com' }],
  },
  {
    slug: 'steerable-needle',
    title: 'Steerable Needle Position Estimation — Multi-View Computer Vision for 3D Tip Tracking in Reflective Gel',
    year: '2025',
    oneLiner:
      'Multi-view perception pipeline that segments, skeletonizes, and triangulates a needle tip from two cameras to reconstruct 3D trajectory in reflective gel.',
    heroImage: '/images/projects/steerable-needle/hero.png',
    role: 'Perception Systems',
    context: 'Team project · Aug 2025 – Dec 2025',
    tags: [
      'Multi-View Geometry',
      'SAM2',
      'Segmentation',
      'Skeletonization',
      'ROS',
      'Triangulation',
      'Computer Vision',
    ],
    problem:
      'We needed to estimate the 3D position of a small needle tip moving through a clear, reflective gel using a top + side camera setup (480p), where reflections and low contrast make conventional stereo unreliable. The goal was to build a reusable 3D position estimator for cases where the target is a single small feature visible in two views.',
    solution:
      'We built a modular multi-view perception pipeline that converts synchronized frames from two cameras into a triangulated 3D needle-tip trajectory: segment the needle in each view using SAM2, skeletonize the mask into a stable 1-pixel centerline, detect endpoints via a convolution neighbor-count method, synchronize and match the two streams using shared geometry (the y-axis), and reconstruct continuous 3D motion with validation against a deformation model. This design (segmentation → geometry) avoided relying on brittle stereo disparity inside the gel and made failure modes easier to isolate and fix.',
    insight:
      'Segmentation-first with geometric consistency beat classic stereo in challenging media: 480p cameras, gel noise, and reflections made disparity unreliable, but SAM2 masks plus skeletonization and shared-axis matching gave a stable 3D trajectory with ~7% relative error.',
    whatIBuilt: [
      'Coordinated experiment workflow and ensured datasets were usable end-to-end',
      'Built and maintained documentation and presentation assets',
      'Helped debug synchronization and qualitative validation by producing overlay and synchronized visualizations that made failure modes obvious frame-by-frame',
    ],
    decisions: [
      'Pivoted from stereo disparity to segmentation-first when baseline stereo failed in gel due to reflections and low contrast',
      'Used shared y-axis across views to align and match detections instead of raw disparity',
      'Added filtering to reject false endpoints from small skeleton branches before reconstruction',
      'Resampled and synchronized both camera streams to a common frame rate before multi-view pairing',
    ],
    systemModes: [
      {
        name: 'Data wrangling',
        items: [
          'Input: ROS bag recordings with two camera topics',
          'Extracted camera topics → MP4 → normalized 15 fps → per-frame images for top/side alignment',
        ],
      },
      {
        name: 'Needle isolation',
        items: [
          'SAM2 point-prompt segmentation produces reliable masks even under gel reflections',
        ],
      },
      {
        name: 'Geometric simplification',
        items: [
          'Skeletonization reduces masks to a stable centerline (top view clean; side view had glare-induced artifacts)',
        ],
      },
      {
        name: 'Tip localization',
        items: [
          'Convolve skeleton with 3×3 neighbor-count kernel; pixels with exactly one neighbor are endpoints (tip + base)',
          'Filtering to reject false endpoints from small skeleton branches',
        ],
      },
      {
        name: 'Multi-view matching',
        items: [
          'Pair endpoints across views via shared y-coordinate; assemble 3D point per frame: x from top view, y shared, z from side view',
        ],
      },
      {
        name: 'Debugging & validation',
        items: [
          'Overlay videos: skeleton + detected tip on original RGB to catch drift and glare errors',
          'Side-by-side synchronized overlays to confirm frame pairing before triangulation',
        ],
      },
    ],
    results: [
      'Reconstructed continuous 3D needle-tip trajectory; validated bending geometry against deformation model',
      'Distance error: 2.547 mm · Needle length: 37 mm · Relative error: 7.075%',
      'Segmentation + geometric consistency outperformed classic stereo in reflective gel at 480p',
    ],
    iteration: [
      'Stereo baseline failed in gel: reflections and low contrast made disparity unreliable → pivoted to segmentation-first',
      'Side-view glare caused SAM2 mask artifacts that bent the skeleton toward bright regions and broke endpoint stability',
      'Small skeleton branches introduced extra endpoints; added filtering before reconstruction',
      'Two videos had different frame rates from ROS bag; explicit resampling/sync required before multi-view pairing',
    ],
    outcome:
      'We reconstructed a continuous 3D needle-tip trajectory and validated the recovered bending geometry against a deformation model. Given 480p cameras, gel noise, and reflections, the ~7% relative error showed that segmentation plus geometric consistency can beat classic stereo in challenging media.',
    learnings: [
      'Segmentation-first pipelines can be more robust than raw stereo in reflective, low-contrast environments',
      'Overlay and side-by-side visualization tooling was critical for debugging sync and glare failures',
      'Explicit frame-rate sync is required when fusing multiple camera streams from ROS bags',
    ],
    status:
      'Completed course project. Pipeline is offline; real-time and prediction priors are natural next steps.',
    nextSteps: [
      'Make the pipeline real-time for closed-loop experiments (tracking while the needle moves)',
      'Add prediction priors (motion/deformation forecasting) to stabilize tracking during ambiguous frames',
      'Improve robustness to glare via better prompting, glare masking, and skeleton cleanup post-processing',
    ],
    inlineImages: [
      { after: 'solution', src: '/images/projects/steerable-needle/pipeline.png', alt: 'Pipeline overview (presentation p.3)' },
      { after: 'systemModes', src: '/images/projects/steerable-needle/skeleton-glare.png', alt: 'Skeletonization results + glare artifact (report p.6)' },
      { after: 'results', src: '/images/projects/steerable-needle/validation.png', alt: 'Model vs measured curve, 7% error (report p.13)' },
    ],
    inlineLocalVideos: [{ after: 'insight', src: '/files/steerable-needle-split-screen.mp4' }],
  },
  {
    slug: 'mri-headphones',
    title: 'SoundImaging — MRI Pneumatic Headphones',
    year: '2025',
    heroImage: '/images/mri-headphones/hero.png',
    oneLiner:
      'Improving audibility and comfort in extreme MRI noise: a redesigned pneumatic headphone system that is fully MRI-safe.',
    role: 'Mechanical / Product Design Engineer (Senior Design Team)',
    context: 'Jan 2025 – Jun 2025 · Industry-sponsored senior design with SoundImaging (medical devices)',
    problem:
      'MRI scans expose patients to extreme acoustic noise (up to ~130 dB) and claustrophobic conditions. SoundImaging provides MRI-safe accessories, but their existing pneumatic headphone system suffered from poor audio clarity, insufficient passive noise dampening, and limited patient comfort. MRI environments prohibit traditional electronic headphones due to strong magnetic fields. Existing pneumatic systems are safe but inefficient: significant sound loss through tubing, poor isolation from MRI background noise, and low signal-to-noise ratio. Design constraints: fully non-ferrous MRI-safe materials, must fit inside MRI head coils, no active noise cancellation, and only a single audio/power cable allowed. Goal: redesign the system to significantly improve audibility, noise isolation, and usability while remaining fully MRI-safe.',
    insight:
      'Audio clarity in MRI environments is dominated by mechanical acoustics and system-level integration—tubing diameter, material choice, internal geometry, and seal quality. Material and geometric optimization can outperform more complex solutions.',
    solution:
      'Complete redesign of three core subsystems: headphones (noise isolation and comfort), transducer (sound generation efficiency), and pneumatic tubing (sound transmission quality). Audio source and amplifier stay outside the MRI room; a piezo-electric speaker in a custom transducer drives sound through large-diameter tubing to sealed, insulated headphones. The in-room system contains no ferromagnetic components. Focus on material choice, geometry, and integration rather than electronics. Result: a significantly louder, clearer, and more comfortable MRI-safe audio system.',
    whatIBuilt: [
      'Headphones: ABS housing with high-density acoustic foam inside ear cups, recycled denim insulation muffs outside, reinforced adjustable headband (Tough 1500 plastic); improved seal and ~15 dB increase in perceived loudness',
      'Transducer: smooth dome geometry, ABS at 15% infill, push-and-twist lid for technician access; lower infill reduced internal resonance and improved sound propagation (~90 dB output at transducer)',
      'Pneumatic tubing: PVC vinyl tubing with large inner diameter (0.0254 m) to reduce turbulence and destructive interference; resistant to kinking, easier to manage than rigid nylon',
      'CAD in SolidWorks; ABS and resin 3D printing, acetone vapor smoothing; joints sealed with silicone sealant and super glue to minimize sound leakage',
      'Contributed to test-bed design: anechoic chamber, simulated MRI noise up to ~120 dB, mannequin head with calibrated microphones for transducer, tubing, and headphone validation',
    ],
    decisions: [
      'Primary objectives: improve passive noise dampening, increase audio clarity and loudness, achieve positive signal-to-noise ratio under MRI noise',
      'Secondary: improve comfort and durability, maintain compatibility across MRI machines, ensure technician-friendly assembly and maintenance',
      'Increased tubing inner diameter to reduce acoustic losses; eliminated unnecessary connectors for signal continuity',
      'Selected ABS at 15% infill for transducer based on acoustic testing and FDA compatibility; prioritized technician usability alongside performance',
    ],
    results: [
      'Maximum headphone output increased from ~79.3 dB to 116.6 dB',
      'Achieved a positive signal-to-noise ratio; frequency sweep showed minimal signal loss across both channels',
      'System met or exceeded all primary performance requirements',
    ],
    iteration: [
      'No active noise cancellation allowed—relied entirely on passive methods',
      'Balancing tubing rigidity vs usability, and comfort tradeoffs when increasing clamp force for acoustic sealing',
      'Avoiding overfitting designs to lab conditions instead of clinical realities',
    ],
    outcome:
      'Substantially improved patient comfort during MRI scans. Delivered a redesign suitable for real clinical deployment while maintaining full MRI compatibility and safety standards. Demonstrated that material and geometric optimization can outperform more complex solutions.',
    learnings: [
      'Acoustic performance is highly sensitive to small geometric changes',
      'Mechanical simplicity often outperforms complex assemblies in constrained environments',
      'Designing for serviceability significantly accelerates iteration and testing',
    ],
    status: 'Completed sponsor-validated prototype delivered as part of senior design.',
    nextSteps: [
      'Implement stereo audio for spatial realism',
      'Explore non-ferrous metallic coatings inside the transducer',
      'Improve manufacturability and long-term durability',
      'Further optimize comfort for long-duration scans',
    ],
    inlineImages: [
      { after: 'whatIBuilt', src: '/images/mri-headphones/transducer-housing.png', alt: 'Transducer housing' },
      { after: 'results', src: '/images/mri-headphones/connector-disc.png', alt: 'Connector disc' },
    ],
    tags: ['Acoustic Design', 'ABS', 'Pneumatic Systems', 'MRI-Safe', 'Product Design', 'FDA Compatibility'],
  },
  {
    slug: 'ambient-ai-clinical-documentation',
    title: 'Ambient AI Clinical Documentation',
    year: '2025',
    heroImage: '/images/ambient-ai-clinical-documentation/hero.png',
    oneLiner:
      'Human-systems evaluation of AI scribes in pediatric care: workflow, trust, safety, and responsible deployment at CHOP.',
    role: 'Human Systems & AI Evaluation (Team Project)',
    context: 'Fall 2025 · Human-systems engineering study of Ambient AI deployment at CHOP',
    problem:
      'Clinical documentation is a major driver of clinician burnout and reduced patient interaction. Ambient AI systems promise relief by recording visits and drafting clinical notes automatically—but this project evaluates whether and how Ambient AI should be deployed responsibly in a real hospital setting. Clinicians spend significant time documenting in the EHR during and after visits, leading to less eye contact and engagement with patients, increased cognitive load, and high levels of burnout and after-hours work. Ambient AI introduces new risks: automation overreliance, silent documentation errors, privacy concerns from continuous recording, and loss of clinician situational awareness. Key question: What human-systems requirements must be met for Ambient AI to reduce workload without introducing new safety, privacy, or trust failures?',
    insight:
      'Ambient AI reduces documentation burden only when mandatory clinician review is preserved. Poor deployment—not model quality—is the primary risk. Treat Ambient as a workflow change, not a plug-in.',
    solution:
      'Ambient AI runs in the background during a visit, records conversations with patient awareness, and uses speech recognition plus AI to draft a structured clinical note; the clinician reviews, edits, and signs the final note. Ambient is assistive, not autonomous—but only if designed and deployed correctly. We focused not on model performance but on human factors, workflow, trust, privacy, and safety. Instead of building software, we produced a sociotechnical implementation prototype: a concrete deployment checklist defining conditions required for safe scaling—room and hardware setup, patient consent and transparency, clinician workflow integration, data privacy and governance, training and change management, feedback and improvement, and controlled rollout. The checklist turns abstract concerns into enforceable system requirements.',
    whatIBuilt: [
      'Literature review on documentation burden, automation bias, and AI scribes in healthcare',
      'Stakeholder interviews with a Human Systems Engineer at CHOP and hospital leadership overseeing the Ambient pilot',
      'Observations from the active Ambient pilot; patient-perspective questionnaire',
      'Workflow and cognitive task analysis (baseline vs Ambient-supported: from "write while thinking" to "think first, then verify")',
      'Ambient deployment checklist covering room and hardware, consent and transparency, workflow integration, privacy and governance, training and change management, feedback and improvement, and controlled rollout',
    ],
    decisions: [
      'Human-in-the-loop by default; visibility of system state at all times; explicit consent and user control',
      'Mandatory clinician review; treat Ambient as a workflow change, not a plug-in',
      'Checklist domains: room and hardware setup, patient consent and transparency, clinician workflow integration, data privacy and security and governance, training and change management, feedback and continuous improvement, controlled rollout strategy',
    ],
    results: [
      'Structured framework for evaluating Ambient AI beyond efficiency; highlights where AI helps and where it must stay assistive',
      'Demonstrates how poor deployment—not model quality—is the primary risk; applicable to AI systems beyond healthcare documentation',
      'Stakeholder synthesis: HSE concern (privacy, overreliance, lack of guardrails); leadership cautiously optimistic; patients want clear consent, visible recording, ability to pause; early signs of over-trust in AI drafts',
    ],
    iteration: [
      'Key risks identified: automation bias, silent transcription or attribution errors, privacy violations, skill degradation, legal and institutional liability, loss of situational awareness',
      'Lack of training and guardrails leads to automation bias and skill degradation; a formal deployment checklist is required for safe scaling',
    ],
    outcome:
      'Provides a structured framework for evaluating Ambient AI beyond efficiency. Highlights where AI helps and where it must stay assistive. Demonstrates that poor deployment—not model quality—is the primary risk. Applicable to AI systems beyond healthcare documentation. Shows judgment under uncertainty, systems thinking in high-stakes domains, understanding of AI failure modes, and willingness to design responsible systems, not just powerful ones.',
    learnings: [
      'Judgment under uncertainty and systems thinking in high-stakes domains',
      'Understanding of AI failure modes; designing responsible systems, not just automating blindly',
      'Human-systems requirements must be explicit and enforceable for safe AI deployment',
    ],
    status: 'Completed human-systems evaluation (Fall 2025).',
    nextSteps: [
      'Introduce uncertainty indicators in AI-generated notes',
      'Study long-term effects on clinician skill retention',
      'Expand evaluation to multi-speaker and high-acuity settings',
      'Establish longitudinal governance and auditing mechanisms',
    ],
    inlineImages: [
      { after: 'solution', src: '/images/ambient-ai-clinical-documentation/ambient-system-diagram.png', alt: 'Ambient system diagram: stakeholders, effects, implementation, and risks' },
      { after: 'whatIBuilt', src: '/images/ambient-ai-clinical-documentation/doug-hock-interview.png', alt: 'Doug Hock interview: plan and execution (VP and System COO at CHOP, oversees Ambient pilot)' },
      { after: 'whatIBuilt', src: '/images/ambient-ai-clinical-documentation/patient-questionnaire.png', alt: 'Patient questionnaire: perceptions of an Ambient AI clinical documentation system' },
    ],
    tags: ['Human Factors', 'Sociotechnical Systems', 'AI', 'Clinical Documentation', 'Healthcare', 'Safety', 'Trust', 'Workflow Design'],
  },
  {
    slug: 'prepcaddy',
    title: 'PrepCaddy',
    year: '2025',
    heroImage: '/images/prepcaddy/hero.png',
    oneLiner:
      'Human-centered hardware for faster, cleaner meal prep: a modular cutting board system with integrated measured containers.',
    role: 'Product Design Engineer',
    context: 'Aug 2025 – Dec 2025 · Human-centered product design course',
    problem:
      'During meal prep, users frequently create clutter from loose ingredients, perform repeated transfer steps (board → bowl → plate), lose track of portion sizes, and deal with mess around the cutting area. Traditional cutting boards optimize for cutting only, not the end-to-end preparation workflow.',
    insight:
      'Workflow over form: users valued function even with a rough prototype. Measured containers were a hit, but attachment needed refinement. Modularity only works if it feels mechanically solid. Small details (like knife storage) matter in physical workflows.',
    solution:
      'PrepCaddy integrates detachable, standardized containers directly beneath the cutting surface. Users cut ingredients directly into measured boxes, transfer entire portions cleanly in one motion, and stage ingredients without cluttering the counter. The system explores expandability and modularity to support different prep styles and quantities. Rather than optimizing for aesthetics, the goal was to reduce friction through iterative prototyping and user testing.',
    whatIBuilt: [
      'Proof-of-concept physical prototype using low-fidelity materials; accepted roughness in fabrication in favor of rapid iteration',
      'Validated box placement and sizing, transfer ergonomics, and discoverability of features; prioritized interaction and workflow testing over finish quality',
      'Conducted user testing with a simple food prep scenario (cutting and transferring apples); synthesized qualitative feedback into design changes',
    ],
    decisions: [
      'Design goals: reduce mess during ingredient prep, make transfer more controlled and intuitive, support portioning with standardized volumes, maintain simplicity and discoverability, validate through hands-on user testing',
      'Proposed iterations from testing: replace friction-fit boxes with snap-in or magnetic attachment; reinforce expansion mechanism or remove if stability cannot be guaranteed; add dedicated knife storage outside the cutting zone; simplify seams for easier cleaning',
    ],
    results: [
      'Observed positives: users intuitively understood the purpose of the boxes; reduced mess vs traditional board; transferring a full box felt satisfying and controlled; standardized volumes helped with portioning',
      'Observed pain points: boxes did not snap securely into place; expanded cutting surface lacked perceived sturdiness; cleaning around seams felt potentially annoying; no intuitive place to store the knife between actions',
    ],
    iteration: [
      'Box attachment and expansion sturdiness needed refinement',
      'Knife storage and seam design emerged as critical from user testing',
    ],
    outcome:
      'PrepCaddy demonstrates comfort working with ambiguity, ability to test ideas quickly with real users, and translating qualitative feedback into mechanical decisions. It complements more technical projects by showing practical product judgment and iteration speed.',
    learnings: [
      'Workflow > form: users valued function even with a rough prototype',
      'Measured containers were a hit, but attachment needed refinement; modularity only works if it feels mechanically solid',
      'Small details (like knife storage) matter in physical workflows',
    ],
    status: 'Completed course project (Dec 2025).',
    nextSteps: [
      'Develop a refined mechanical attachment system',
      'Move to mid-fidelity prototypes with food-safe materials',
      'Test with longer, multi-ingredient meal prep sessions',
      'Evaluate cleaning, storage, and durability over time',
    ],
    inlineImages: [
      { after: 'solution', src: '/images/prepcaddy/poster.png', alt: 'PrepCaddy poster: faster, cleaner, easier cooking — detachable transfer cups, removable cutting lid, easy clean' },
    ],
    tags: ['User Research', 'Rapid Prototyping', 'Product Design', 'Human-Centered Design', 'Physical Workflow', 'Iteration'],
  },
  {
    slug: 'apollo-x-etower',
    title: 'Eversun Energy — Apollo X eTower',
    year: '2024',
    heroImage: '/images/apollo-x-etower/hero.png',
    oneLiner:
      'Portable, rapid-deploy solar lighting for industrial use: collapsible solar-powered tower for construction, emergency response, and outdoor operations.',
    role: 'Mechanical Engineering Intern',
    context: 'Jul 2024 – Sept 2024 · Eversun Energy · Industry product development (prototype → alpha build)',
    problem:
      'Traditional commercial light towers are heavy and difficult to transport, slow to deploy and retract, mechanically complex and failure-prone, and dependent on diesel generators with high operating costs. Early Apollo X prototypes met performance goals but exposed reliability and usability issues in the leg deployment and actuation mechanisms, especially during repeated setup and teardown.',
    insight:
      'Simplifying the actuation mechanism and improving ergonomics directly improved reliability and user confidence. Ownership over failure-prone subsystems required improving existing designs rather than starting from scratch.',
    solution:
      'Apollo X is a portable, collapsible solar-powered lighting tower with three primary subsystems: a telescoping carbon-fiber mast (5 ft to 23 ft) supporting high-output LED lighting; a central body housing batteries, electronics, and controls; and a deployable leg system with gas struts and integrated solar panels. The system collapses for compact transport and deploys without tools. A major redesign replaced the pulley-based leg actuation with a robust lever-driven mechanism: 90° handle rotation translates into vertical rod motion, with simplified cable routing and secure set-screw attachments, and a larger handle for better ergonomics and leverage. This significantly improved reliability, ease of use, and perceived build quality.',
    whatIBuilt: [
      'Led redesign of the leg deployment actuation mechanism: replaced pulley system with lever-driven mechanism, 90° handle to vertical rod motion, simplified cable routing with set-screw attachments, increased handle size for ergonomics and leverage',
      'Integrated redesigned mechanism into the Apollo X alpha prototype; conducted repeated deployment and retraction tests; verified smooth operation under load',
      'Contributed to system design context: telescoping mast and lighting, central body and controls, leg deployment and stability (gas-strut-assisted, uneven terrain, integrated solar, folding for transport)',
    ],
    decisions: [
      'Replace pulley-based cable routing with robust lever-driven mechanism to eliminate fraying and sensitivity to misalignment',
      '90° handle rotation translated into vertical rod motion; simplified cable routing with secure set-screw attachments',
      'Increased handle size for better ergonomics and leverage; prioritized durability, ergonomics, and manufacturability under startup constraints',
    ],
    results: [
      'Significantly improved deployment reliability, ease of use, and perceived build quality',
      'Reduced mechanical failure risk in a critical subsystem; contributed to demo-ready alpha prototype',
      'Updated mechanism became a key improvement highlighted during investor-facing demonstrations',
    ],
    outcome:
      'Improved deployment reliability and user confidence; reduced mechanical failure risk in a critical subsystem. Contributed to a demo-ready alpha prototype and gained experience shipping real hardware in an industrial context. Demonstrates real-world mechanical engineering under production constraints, ownership over failure-prone subsystems, and ability to improve existing designs rather than starting from scratch.',
    learnings: [
      'Real-world mechanical engineering under production constraints',
      'Ownership over failure-prone subsystems; improving existing designs rather than starting from scratch',
      'Experience building hardware for actual deployment, not just coursework',
    ],
    status: 'Completed internship (Sept 2024).',
    inlineImages: [
      { after: 'solution', src: '/images/apollo-x-etower/dimensions.png', alt: 'Apollo X eTower stowed and deployed dimensions, carrying case' },
      { after: 'whatIBuilt', src: '/images/apollo-x-etower/actuation-mechanism.png', alt: 'Redesigned lever-driven actuation mechanism with set-screw cable attachment' },
      { after: 'whatIBuilt', src: '/images/apollo-x-etower/specifications.png', alt: 'Eversun eTower specifications: output, mast, energy, power, connectivity, case' },
      { after: 'results', src: '/images/apollo-x-etower/cost-savings.png', alt: 'Cost savings: Eversun eTower vs diesel tower — 5-year TCO, emissions, weight, setup time' },
    ],
    tags: ['Mechanical Design', 'Solar', 'Industrial', 'Deployment', 'Prototyping', 'Ergonomics', 'Manufacturability'],
  },
  {
    slug: 'autonomous-turret',
    title: 'Autonomous Projectile-Launching Vehicle',
    year: '2025',
    heroImage: '/images/autonomous-turret/hero.png',
    oneLiner:
      'An autonomous mobile robot capable of navigating indoor environments, detecting targets using vision, and actuating a servo-driven projectile launcher.',
    role: 'Mechanical Lead',
    context: 'UCSD ECE / MAE 148 · Spring 2025',
    problem:
      'Building an autonomous system that combines navigation, perception, and precise mechanical actuation under tight time and hardware constraints. The system needed to reliably scan for targets, track motion, and fire accurately while mounted on a mobile platform.',
    insight:
      'The hardest problems weren\'t autonomy or vision in isolation, but mechanical reliability and integration. Small inaccuracies in turret design, servo alignment, or mounting rigidity directly degraded tracking and firing performance. Mechanical iteration speed mattered more than theoretical optimization.',
    solution:
      'A pan-tilt turret with servo-driven yaw and pitch, integrated with a trigger actuation mechanism, mounted on an autonomous vehicle using a ROS-based perception and control stack.',
    whatIBuilt: [
      'Designed and fabricated a pan-tilt turret housing for precise yaw and pitch control',
      'Designed a servo-driven trigger actuation mechanism to reliably fire projectiles',
      'Iterated through multiple CAD revisions to improve stiffness, alignment, and serviceability',
      'Integrated servos, electronics, and mechanical components into a compact, robust assembly',
      'Worked closely with perception and ROS pipelines to ensure mechanical motion matched tracking outputs',
    ],
    decisions: [
      'Chose servo actuation over more complex firing mechanisms to maximize reliability under time constraints',
      'Simplified projectile mechanics to reduce calibration complexity during testing',
      'Prioritized structural rigidity and repeatability over aesthetic enclosure design',
      'Designed for rapid disassembly to enable fast iteration during debugging',
    ],
    systemModes: [
      {
        name: 'Driving Mode',
        items: [
          'Autonomous hallway navigation using stereo depth sensing',
          'Vehicle drives forward until detecting proximity to obstacles and stops automatically',
        ],
      },
      {
        name: 'Sentry Mode',
        items: [
          'Turret scans 180° for targets',
          'Vision system locks onto red-colored targets and tracks motion',
          'Human-confirmed firing via servo-driven trigger actuation',
        ],
      },
    ],
    iteration: [
      'Initial turret housing introduced unexpected mechanical complexity',
      'GPS-based navigation was abandoned due to poor ROS support and documentation',
      'Lidar integration was cut after evaluating feasibility under a one-week timeline',
      'These constraints forced a shift toward depth-based indoor navigation and simplified targeting',
    ],
    outcome:
      'Delivered a fully functional autonomous prototype demonstrating navigation, target tracking, and firing. The system performed reliably during live demos and validated the mechanical architecture under real operating conditions.',
    learnings: [
      'Mechanical design is often the bottleneck in autonomous systems',
      'Iteration speed beats over-engineering early designs',
      'Integration work dominates final timelines more than individual subsystems',
    ],
    status:
      'Completed course prototype. The mechanical architecture informed later work on integrated hardware-software systems.',
    inlineImages: [
      { after: 'whatIBuilt', src: '/images/autonomous-turret/cad-models.png', alt: 'CAD models of pan-tilt turret' },
      { after: 'systemModes', src: '/images/autonomous-turret/pan-tilt-tracking.png', alt: 'Pan-tilt turret tracking' },
    ],
    links: [{ label: 'Demo Video', href: 'https://youtu.be/QEE1iDBzJlU' }],
    tags: ['ROS', 'Mechanical Design', 'CAD', 'Servo Control', 'Computer Vision', 'Rapid Prototyping'],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
