export type Project = {
  slug: string
  title: string
  year: string
  oneLiner: string
  heroImage?: string
  /** Optional fit for hero image on project cards. Use "contain" when the image should not be cropped (e.g. to show full subject). */
  heroImageFit?: 'cover' | 'contain'
  /** Optional position for hero image on project cards (e.g. "left top" to crop right/bottom and enlarge subject). */
  heroImagePosition?: 'center' | 'left top' | 'left' | 'top'
  /** Optional scale for hero image (e.g. 1.3 = zoom in so subject appears larger in the card). */
  heroImageScale?: number
  /** When set, project card links to this URL instead of /work/[slug] */
  externalUrl?: string
  gallery?: string[]
  /** Images to show between sections. `after` = section key: problem, insight, solution, whatIBuilt, decisions, systemModes, results, iteration, outcome, learnings, status, nextSteps */
  inlineImages?: { after: string; src: string; alt?: string }[]
  /** YouTube videos to show between sections. Use video ID only (e.g. YdCnRnITyKg from youtu.be/YdCnRnITyKg). */
  inlineVideos?: { after: string; youtubeId: string }[]
  /** Local video files (e.g. /files/demo.mp4) to embed between sections. */
  inlineLocalVideos?: { after: string; src: string; caption?: string }[]
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
    title: 'IRIX | AI Coaching on Wearables',
    year: '2026',
    oneLiner:
      'Two working sensing systems for the gym floor, smart glasses that read plate loads and count reps and a camera plus wristband tracker that fuses video with motion data, and the decision to ship the coach as an app on wearables people already own.',
    heroImage: '/images/projects/irix-hero.png',
    heroImagePosition: 'left',
    heroImageScale: 1.4,
    inlineImages: [
      { after: 'solution', src: '/images/projects/irix-hud-ring.png', alt: 'Even G2 smart glasses on wooden surface' },
      { after: 'systemModes', src: '/images/irix/plate-loading.jpg', alt: 'First-person camera frame from a demo session: loading plates onto the bar, the view the vision model reads the load from' },
      { after: 'systemModes', src: '/images/irix/rep-signal.jpg', alt: 'Raw accelerometer and gyroscope traces from the glasses motion sensor during a set, with the repeating pattern of each rep visible' },
      { after: 'systemModes', src: '/images/irix/tracking-dataflow.svg', alt: 'Data flow of the camera and wristband tracking system: wristband, gateways, edge server, identity fusion, camera pipeline, rep and exercise models, app and dashboard' },
      { after: 'results', src: '/images/irix/demo-hud.jpg', alt: 'Frame from an IRIX demo video: first-person view at a squat rack with the display overlay showing exercise, load, rep count, and set' },
    ],
    inlineVideos: [{ after: 'problem', youtubeId: 'YdCnRnITyKg' }],
    role: 'Co-Founder',
    context: 'Feb 2026 – Present · San Francisco, CA',
    tags: [
      'Wearable Systems',
      'Sensor Fusion',
      'IMU Signal Processing',
      'Extended Kalman Filter',
      'Vision-Language Models',
      'Product Design',
      'Swift',
      'Python',
    ],
    problem:
      'The hardest technical problem at IRIX is knowing what a person is doing in a gym, which exercise, how much weight, and how many reps, without asking them to log anything. Cameras lose people behind racks and other members. Wrist and head motion sensors drift and cannot tell which bar is loaded. Most gym-goers train without a coach because personal training is expensive and hard to scale, and phone apps that need manual logging between sets break focus. A coach that works has to sense the workout on its own and stay out of the way.',
    insight:
      'No single sensor is enough, and each one is good at a different thing. A camera is good at slow, deliberate facts like what weight is on the bar. A motion sensor is good at fast, repetitive facts like rep timing. The system should use each sensor only for the job it does well, and combine them only where the combination produces a better estimate than either one alone.',
    solution:
      'I built this in three steps. First, a smart-glasses coaching prototype that uses the camera to verify setup and read the load, then hands off to the motion sensor to count reps. Second, a multi-camera and wristband tracking system that fuses video and motion data so tracking survives occlusion. Third, after pricing out what it takes to deploy sensing hardware in a real gym, an app-based coach that runs on Apple Watch, WHOOP, Garmin, and Oura data, which is the product IRIX ships today.',
    whatIBuilt: [
      'Smart-glasses coaching prototype, end to end: glasses camera and motion sensor, an iOS app that orchestrates the session, a Python backend for the vision model, and spoken coaching through the glasses',
      'On-device rep counting from the glasses motion sensor, validated on squats, deadlifts, and pull-ups',
      'Multi-camera and wristband tracking system that fuses video and motion data with an Extended Kalman Filter and matches a wristband to a person without facial recognition',
      'Product and technical roadmap for the app-based coach built on Apple Watch, WHOOP, Garmin, and Oura data',
      'The pricing model and unit economics behind the gym pitch',
    ],
    decisions: [
      'Camera for setup, motion sensor for reps, never both at once. A vision model call on every frame is slow and expensive, and rep timing does not need it. The app enforces this as a hard rule, which also keeps the system simple enough to run reliably in a live demo.',
      'Confidence gates sized to the stakes. A loose check like "is the user at a rack" passes on one of two frames. Reading the actual weight needs three consistent frames at high confidence plus a sanity check on the number, because a wrong load corrupts everything logged after it.',
      'Rep counting runs on the phone, not in the cloud. Feedback has to arrive within the rep, and a gym network cannot be trusted for that.',
      'Identity without facial recognition. The tracker decides who is who by checking whether a wristband\'s motion matches the motion a camera sees, plus proximity and continuity. This was a privacy decision made up front, not a missing feature.',
      'Audio first. Visual attention is scarce during a lift, so coaching is spoken and the display only carries essentials like set progress.',
    ],
    systemModes: [
      {
        name: 'Smart-glasses system: setup verification',
        items: [
          'The glasses stream video to a vision-language model that walks through a fixed sequence of checks: is the user at a rack, has the bar been loaded, what weight is on it',
          'Each check has its own confidence bar. An ambient check needs 1 of 2 frames at 0.6 confidence, a deliberate action needs 2 of 2 at 0.7, and reading the weight needs 3 of 3 consistent frames at 0.85 plus a validator on the value',
          'Once the load is confirmed the camera turns off and the motion sensor takes over',
        ],
      },
      {
        name: 'Smart-glasses system: rep counting',
        items: [
          'Motion data streams from the glasses over Bluetooth at 25 Hz and is processed on the phone',
          'Filtering: the signal is resampled onto a uniform grid and passed through a zero-phase bandpass filter (0.15 to 11 Hz), which removes drift and vibration without shifting the timing of each rep',
          'Period estimation: autocorrelation finds the dominant rep period, so the counter knows roughly how far apart reps should be',
          'Peak detection: reps are counted as peaks that clear a percentile-based amplitude threshold, which rejects small noise peaks between reps',
          'Validated on squats, deadlifts, and pull-ups',
        ],
      },
      {
        name: 'Multi-camera and wristband tracking system',
        items: [
          'An Extended Kalman Filter estimates position and velocity by combining camera-tracked position with wristband accelerometer data into one estimate',
          'Zero-velocity updates: at the dead stop in each rep, such as the bottom of a squat, the filter knows velocity is zero and uses that to cancel accumulated drift',
          'Tracking through occlusion: the camera rep count and an independent motion-only rep count are merged, with more weight on the motion sensor when the camera loses confidence',
          'Multi-view 3D pose by triangulation when two or more calibrated cameras overlap',
          'Identity matching without facial recognition, using motion correlation between the wristband and the bodies a camera sees, plus proximity and continuity',
          'Data flow: wristband → gateways → edge server → identity fusion → camera pipeline → rep and exercise models → member app and gym dashboard',
        ],
      },
    ],
    results: [
      'Working smart-glasses prototype: the vision model reads plate loads and verifies setup, and on-device signal processing counts reps in real time',
      'Rep counting validated on squats, deadlifts, and pull-ups',
      'Multi-camera and wristband tracker that follows lifts through occlusion and identifies users without facial recognition',
      'Pilot and partnership discussions with 24 Hour Fitness and 5+ boutique operators',
    ],
    iteration: [
      'The pivot to an app-based coach was a deliberate decision about three things: deployment cost, adoption friction, and scalability',
      'Deployment cost: a camera and wristband system needs cameras, anchors, edge compute, installation, and calibration in every gym before a single member gets value',
      'Adoption friction: shared glasses or wristbands mean check-out, charging, and cleaning workflows for gym staff, and a new device for every member to learn',
      'Scalability: many members already wear an Apple Watch, WHOOP, Garmin, or Oura. Building on that data reaches them with a software install instead of a hardware rollout',
      'Early glasses prototypes favored capability over usability. Later versions cut the output down to what a person can absorb mid-set',
    ],
    outcome:
      'IRIX today is an app-based AI coach built on Apple Watch, WHOOP, Garmin, and Oura data. The sensing prototypes were not wasted: they set the bar for what the coach should know about a workout, and the tracking architecture is written down for a future instrumented training zone.',
    learnings: [
      'Use each sensor for the job it is good at before reaching for fusion. A clean handoff between two sensors can beat a complicated filter',
      'Fusion earns its complexity when one sensor regularly fails, as cameras do under occlusion',
      'The best sensing system is not the best product if every customer has to install it. Deployment cost belongs in the design requirements from day one',
    ],
    status:
      'Pre-launch. The app-based coach is in testing. Pilot and partnership discussions are ongoing with 24 Hour Fitness and 5+ boutique operators.',
    nextSteps: [
      'Prove the core loop in a controlled demo lane before any full-facility tracking: one rack, one bench, a few cameras, a handful of wristbands',
      'Measure identity accuracy, rep accuracy, latency, and member friction in that lane',
      'Bring workout sensing back into the app-based coach as wearable hardware allows',
    ],
    links: [{ label: 'Website', href: 'https://tryirix.com' }],
  },
  {
    slug: 'mri-headphones',
    title: 'SoundImaging | MRI Pneumatic Headphones',
    year: '2025',
    heroImage: '/images/mri-headphones/hero.png',
    oneLiner:
      '~45% signal-to-noise improvement in an MRI-safe pneumatic headphone system, from a redesigned transducer housing, sealed acoustic joints, and better tubing.',
    role: 'Product Design Engineer',
    context: 'Jan 2025 – Jun 2025 · UCSD senior design, sponsored by SoundImaging · Team of four',
    problem:
      'An MRI scanner is loud enough to hurt, with noise reaching 130 dB, and nothing electronic or ferrous can go inside the bore. Headphones for MRI patients are therefore pneumatic: a speaker outside the scan room turns the signal into sound, and the sound itself travels through plastic tubing to the patient. Every part of that path loses sound. SoundImaging\'s existing system was hard to hear over the scanner, and the team was asked to make it clearer and better at blocking noise while staying fully non-ferrous, using FDA-compliant materials, fitting inside a head coil, and with no active noise cancellation.',
    insight:
      'With no electronics allowed near the patient, audio quality is a mechanical design problem. Clarity is decided by the transducer housing geometry, the tubing bore, and how well every joint is sealed. Each connection point is a place where sound leaks out or reflects back.',
    solution:
      'We redesigned the three parts of the sound path. The transducer, where a piezo speaker converts the electrical signal into sound, got a new housing with a smooth interior dome and a push-and-twist lid. The tubing was changed to 1 in. inner diameter PVC. The headphones were rebuilt with acoustic foam inside the ear cups, insulation muffs outside, and a stiffer headband for a tighter seal. Every joint between the three was sealed.',
    whatIBuilt: [
      'Redesigned the transducer housing in SolidWorks with a tool-free push-and-twist lid, so an MRI technician can open and service it without tools',
      'Sealed every acoustic joint, tubing to transducer and tubing to headphones, with silicone sealant and gaskets so sound is not lost at the connections',
      'Selected 1 in. PVC tubing after testing it against nylon, polyethylene, and polyurethane',
      'Chose MRI-safe, FDA-compliant materials throughout, with ABS for the printed housing',
      'Defined how audio quality would be measured. I compared frequency response, harmonic distortion, signal-to-noise ratio, and clarity ratio as candidate metrics, so every design change could be judged by a number instead of by ear',
      'Helped build the test bed: an anechoic chamber with a speaker playing simulated MRI noise and a mannequin head with a microphone in each ear',
    ],
    decisions: [
      'MRI-safe, FDA-compliant materials. The housing is ABS because ABS can be approved for medical devices, unlike PLA, and it is durable where resin prints are brittle. Nothing in the scan room is ferrous.',
      'Push-and-twist lid on the transducer housing. Technicians install and service these systems by hand, so the lid opens and closes without tools.',
      'Smooth interior dome. We tested smooth and stair-step dome interiors across several print materials and kept the smooth ABS dome.',
      'Every acoustic joint sealed. Fewer connection points and airtight joints mattered as much as any single component, because each leak lowers the signal that reaches the ear.',
      '1 in. PVC tubing over nylon. Nylon measured louder in testing, but it was too rigid to route around the scanner bed and head coil. PVC resists kinking, which matters because a kink blocks and reflects sound, and it is easy for a technician to install.',
      'Passive noise blocking only. Active cancellation needs electronics in the bore, so isolation comes from foam, insulation, and clamping force on the ear cups.',
      'Signal-to-noise ratio as the headline metric. It compares what the patient hears from the headphones against the scanner noise that gets through, which captures both louder audio and better isolation in one number. Frequency sweeps covered what it misses, since a sweep shows peaks and dips across the audible range.',
    ],
    results: [
      '~45% improvement in signal-to-noise ratio',
      'Clear audio against scanner noise that reaches 130 dB, the project goal of a positive signal-to-noise ratio',
      '20 to 30 dB improvement in passive noise dampening, measured in the test chamber',
      'A frequency sweep through both ears showed only marginal loss between left and right channels',
      'Listen to the difference below: the original headphones, then the redesign, recorded through the mannequin head in the test chamber',
    ],
    iteration: [
      'Tested transducer domes in PLA, ABS, and resin with smooth and stair-step interiors before settling on smooth ABS',
      'Tested four tubing materials and several diameters. Larger bore was the clearest single driver of audio quality',
      'Removed the internal "spoons" from the sponsor\'s ear cups, which were choking off the sound',
      'Earlier headbands sealed tighter but were ferrous, so the band was redesigned in a rigid plastic',
      'The piezo speaker degraded over the course of testing, which is a caveat when comparing early and late measurements',
    ],
    outcome:
      'The sponsor received a working prototype that is louder, clearer, and easier to service than the system we started with, with CAD, test data, and a bill of materials. The redesign cost about the same in materials as the original.',
    learnings: [
      'In a pneumatic audio path, the biggest gains come from a larger tube and fewer, better-sealed connections',
      'Designing for the technician who services the part, not only the patient who wears it, changed the housing design',
      'Good test data needs a calibrated microphone and a quiet room. We built the test bed before trusting any comparison',
    ],
    status: 'Completed. Prototype and documentation delivered to SoundImaging in June 2025.',
    nextSteps: [
      'Stereo audio, by splitting the signal into two tubes',
      'A thin non-ferrous metal coating inside the transducer dome to reduce sound loss through the plastic',
      'Lighter tubing at the same bore',
      'More comfort work for long scans',
    ],
    inlineImages: [
      { after: 'solution', src: '/images/mri-headphones/system-diagram.jpg', alt: 'Diagram of the redesigned system: phone and amplifier outside the MRI room, transducer and pneumatic tubing inside, headphones on the patient' },
      { after: 'whatIBuilt', src: '/images/mri-headphones/transducer-housing.png', alt: 'CAD of the transducer housing with the push-and-twist lid seat' },
      { after: 'whatIBuilt', src: '/images/mri-headphones/transducer-section.jpg', alt: 'Section view of the transducer housing CAD showing the smooth interior dome and the push-and-twist lid' },
      { after: 'whatIBuilt', src: '/images/mri-headphones/transducer-and-tubing.jpg', alt: 'Printed transducer housing connected to a coil of 1 in. clear PVC tubing' },
      { after: 'decisions', src: '/images/mri-headphones/tubing-sizes.jpg', alt: 'Tubing candidates of different diameters and materials held side by side' },
      { after: 'decisions', src: '/images/mri-headphones/connector-disc.png', alt: 'CAD of the connector disc that joins the two tubes to the transducer housing' },
      { after: 'results', src: '/images/mri-headphones/test-rig.jpg', alt: 'Test rig: mannequin head wearing the headphone prototype inside the anechoic box, with a microphone in each ear' },
      { after: 'results', src: '/images/mri-headphones/frequency-sweep.jpg', alt: 'Frequency sweep recorded at both ears of the mannequin head, showing similar output on left and right channels' },
      { after: 'iteration', src: '/images/mri-headphones/dome-prototypes.jpg', alt: 'Printed transducer dome prototypes in different materials and geometries laid out on a table' },
      { after: 'iteration', src: '/images/mri-headphones/transducer-printed.jpg', alt: 'A printed transducer housing with tubing attached, on the test chamber' },
      { after: 'iteration', src: '/images/mri-headphones/headband-iterations.jpg', alt: 'Four headband iterations, from early prints to the final rigid plastic band' },
    ],
    inlineLocalVideos: [
      { after: 'results', src: '/files/mri-headphones-before.mp4', caption: 'Before: original headphones (sound on)' },
      { after: 'results', src: '/files/mri-headphones-after.mp4', caption: 'After: redesigned system (sound on)' },
    ],
    tags: ['Medical Devices', 'Acoustics', 'Mechanical Design', 'SolidWorks', 'MRI-Safe', 'Materials Selection'],
  },
  {
    slug: 'apollo-x-etower',
    title: 'Eversun Energy | Apollo X eTower',
    year: '2024',
    heroImage: '/images/apollo-x-etower/hero.png',
    oneLiner:
      'Solar lighting tower taken from concept to a demo-ready alpha in 3 months. The leg-deployment cables were fraying after about 25 cycles. I traced it to rotational wear and fixed it at the root.',
    role: 'Mechanical Engineering Intern',
    context: 'Jul 2024 – Sep 2024 · Eversun Energy · San Diego, CA',
    problem:
      'The legs of the Apollo X deploy on gas struts, and the struts release when internal metal cables are pulled. I noticed the cables fraying after only about 25 deployment cycles. That is far too few for this product: the customers are construction crews and search and rescue teams, who set a tower up and tear it down constantly and need components that last. Deployment is also the first thing a customer or investor sees, and a tower whose legs stop releasing is useless in the field. The lever handle was also small, which made it hard to grip when folding the legs back up. The fix had to fit inside the existing main body frame, pull the cables reliably, be easy to use, hold up outdoors, and lock for security.',
    insight:
      'The fraying was not a cable strength problem. The old lever turned a pulley, and that pulley dragged the cable through a rotation every time the legs deployed. The repeated rotational wear is what broke the strands. A tougher cable would only have delayed the failure. Changing the motion from rotary to linear removes the cause.',
    solution:
      'I started from an off-the-shelf industrial lever whose 90° handle rotation drives an internal rod straight up and down, and redesigned it to work in the tower. The locking handle had to fit a 25 mm cavity in the main body, and no part on the market did, so I modified the design until it fit without weakening the structure around it. The actuation cable attaches to the rod with a set screw, on a mount I made to route it into the tower body, so the cable is only ever pulled in a straight line. The larger handle also gave users a proper grip, which solved the ergonomics problem with the same part. The Apollo X itself is a portable solar lighting tower: a telescoping carbon fiber mast that extends from 5 ft to 23 ft, a main body with the control panel and two swappable battery packs, and four legs that extend past 90° and carry foldable solar panels.',
    whatIBuilt: [
      'Led design and fabrication of the Apollo X alpha, from concept to demo-ready hardware in 3 months',
      'Root-caused the cable fraying to rotational wear in the pulley-routed lever and replaced it with a linear-pull locking handle, built by modifying an off-the-shelf lever',
      'Made the design changes that got the handle into the tower: it had to fit a 25 mm cavity in the main body, lock for security, and leave the surrounding structure intact, and nothing available off the shelf did all three',
      'Designed the mount and set-screw cable attachment that connect the handle to the strut cables',
      'Specified the gas struts and their lengths, and selected the leg materials, based on the loads and outdoor conditions the tower had to handle',
      'Design for assembly: wrote the step-by-step assembly sequence for the alpha unit before handoff',
    ],
    decisions: [
      'Fix the motion, not the cable. Linear pull removes the rotational wear that caused the fraying, so the failure cannot come back with a different cable.',
      'Modify a proven mechanism instead of designing from scratch. An existing industrial lever already converted handle rotation to linear travel and came with a large handle. Starting from it was faster and more durable than a fully custom mechanism, and the engineering work went into the changes needed to fit the 25 mm cavity, attach the cable, and lock.',
      'Larger handle. Users hold the lever while lifting the legs to fold the tower, so grip size directly affects whether one person can pack it up.',
      'Requirements first. I wrote the functional requirements (fit the frame, pull the cables reliably, intuitive, durable, lockable) before brainstorming, then compared modifying an existing lever against a fully custom one.',
    ],
    results: [
      'Cable fraying eliminated. The old lever frayed its cables within about 25 cycles, and the new one pulled them reliably through testing and live demos',
      'Legs extended smoothly and consistently on rough and uneven ground',
      'Smooth deployment became a key selling point in investor demos',
      'Demo-ready alpha unit completed in 3 months',
    ],
    outcome:
      'The alpha unit deployed reliably in front of investors, and the lever redesign was the visible difference. The finished tower stows at 5 x 2 x 1 ft, weighs 85 lb (120 lb with its case), and deploys in under 60 seconds.',
    learnings: [
      'Find the mechanism behind a failure before choosing a fix. The obvious fix here, a stronger cable, would have shipped the same problem',
      'Starting from a proven mechanism and modifying it well is often the better engineering decision',
      'Reliability and ergonomics can come from the same part when the requirements are written down first',
    ],
    status: 'Completed internship (Sep 2024).',
    inlineImages: [
      { after: 'problem', src: '/images/apollo-x-etower/lever-before-pulley.jpg', alt: 'Before: the original lever with its pulley and the cable routed around it' },
      { after: 'insight', src: '/images/apollo-x-etower/lever-off-the-shelf.jpg', alt: 'The lever the redesign started from, held in hand, with the rod that moves vertically when the handle turns' },
      { after: 'solution', src: '/images/apollo-x-etower/actuation-mechanism.png', alt: 'After: the redesigned lever mechanism with the actuation cable attached to the rod by a set screw' },
      { after: 'solution', src: '/images/apollo-x-etower/dimensions.png', alt: 'Apollo X eTower stowed and deployed dimensions, carrying case' },
      { after: 'whatIBuilt', src: '/images/apollo-x-etower/lever-installed.jpg', alt: 'The new lever installed on the tower body with the gas struts and cables below it' },
      { after: 'whatIBuilt', src: '/images/apollo-x-etower/specifications.png', alt: 'Eversun eTower specifications: output, mast, energy, power, connectivity, case' },
      { after: 'decisions', src: '/images/apollo-x-etower/brainstorm-sketches.jpg', alt: 'Sticky-note sketches from the lever redesign brainstorm' },
      { after: 'results', src: '/images/apollo-x-etower/leg-struts.jpg', alt: 'A leg deployed on its gas struts during testing in the warehouse' },
    ],
    tags: ['Mechanical Design', 'Mechanism Design', 'Prototyping', 'Ergonomics', 'Design for Assembly', 'Fabrication'],
  },
  {
    slug: 'bci-finger-decoding',
    title: 'Brain-Computer Interface | Finger Movement Decoding',
    year: '2026',
    heroImage: '/images/bci-finger-decoding/predicted-vs-actual.jpg',
    oneLiner:
      'More than doubled decoding accuracy over a linear baseline (correlation 0.24 → 0.54) when predicting individual finger movement from brain-surface recordings in three human subjects.',
    role: 'Machine Learning Project',
    context: 'Jan 2026 – May 2026 · University of Pennsylvania · Team of three',
    problem:
      'The task is to predict how much each finger is bending, moment by moment, using only electrical signals recorded from the surface of the brain (ECoG). The data comes from three human subjects, each with 48 to 64 electrodes sampled at 1000 Hz, alongside a data glove that recorded the true finger positions. The signal is noisy, the useful information is spread across frequency bands, and the same electrodes pick up activity for several fingers at once.',
    insight:
      'A linear decoder topped out at a correlation of about 0.24, and regularizing it barely helped. The limit was not overfitting. Finger movement depends on how band power changes over about a second of history, and a linear map of a few time lags cannot capture that. The other finding was anatomical: ring-finger errors traced to shared tendons and overlapping brain activity between neighboring fingers, so the ring finger rarely moves, or is represented, on its own.',
    solution:
      'The pipeline has four stages. Filtering cleans the raw signal. Feature extraction turns it into band power over short windows. Per-subject neural networks map about 1.5 seconds of feature history to the five finger positions. An ensemble averages the best models, and the output is smoothed and interpolated back to the original sample rate.',
    whatIBuilt: [
      'A deep learning pipeline that decodes individual finger flexion from ECoG signals, including the filtering and feature extraction for noisy neural data',
      'The linear decoder baseline and its regularized variants, which set the 0.24 starting point and showed that regularization alone would not close the gap',
      'Iterated from the regularized linear decoder to per-subject CNN and GRU ensembles trained across multiple seeds',
      'Diagnosed why ring-finger predictions lagged the other fingers',
    ],
    decisions: [
      'Remove shared noise first. Each sample is re-referenced to the average across electrodes and outlier spikes are clipped, so a single artifact does not dominate the features.',
      'Bandpass 0.5 to 200 Hz and notch at 60 and 120 Hz. This keeps the range that carries movement information and removes electrical line noise.',
      'Frequency-band features over 50 ms windows. Each window yields the mean voltage plus log power in 11 bands per electrode, with the high-frequency range split into finer bands because it carries the most movement information.',
      'Give the model history. Each input is 30 consecutive windows, about 1.5 seconds, because finger movement is predicted better from how the signal evolves than from a single instant.',
      'One model set per subject. Electrode placement differs between people, so a decoder trained on one brain does not transfer to another.',
      'Two architectures, five seeds each. A residual 1D CNN and a CNN with a bidirectional GRU make different errors, and so do different random seeds. Of the ten candidates per subject, the three with the best validation correlation are averaged, which reduces variance.',
      'Smooth per finger. Predictions are Gaussian-smoothed with a different width per finger, then interpolated back to 1000 Hz.',
    ],
    results: [
      'Correlation between predicted and true finger flexion rose from 0.24 with the linear baseline to 0.54 with the ensemble, more than double',
      'Ensembling added 0.02 to 0.05 correlation over any single model. On Subject 1, single models scored 0.464 to 0.530 and the ensemble scored 0.568 on validation',
      'The model tracks the timing of thumb and index movements well but underpredicts large flexions. Ring-finger predictions lagged, and the cause was traced to anatomy, not the model',
    ],
    iteration: [
      'Linear decoder with three lagged windows of features: correlation about 0.24, with the middle and little fingers near zero',
      'Ridge regression first gave identical results because the default penalty was negligible at the scale of the data. Cross-validated regularization, log-power features, standardization, and more lags helped, but the linear model still could not reach 0.35',
      'Shorter 50 ms windows improved on the 100 ms starting point by doubling time resolution',
      'Single CNN and CNN-GRU models varied a lot between seeds, and some seeds failed on individual fingers. Ensembling fixed the instability',
    ],
    outcome:
      'The final ensemble reached a correlation of 0.54 against a linear baseline of 0.24. The ring-finger analysis explained the remaining error in physical terms: neighboring fingers share tendons and their brain activity overlaps, so some of what looks like model error is real coupling in the hand.',
    learnings: [
      'Filtering and feature design set the ceiling. The networks only helped once the inputs were clean band-power features',
      'A strong, well-understood baseline makes every later gain measurable',
      'When one output lags the rest, check the physiology before tuning the model',
    ],
    status: 'Completed (May 2026).',
    nextSteps: [
      'Try transformer-based sequence models',
      'Run a wider hyperparameter search',
    ],
    inlineImages: [
      { after: 'solution', src: '/images/bci-finger-decoding/pipeline-flowchart.jpg', alt: 'Flow chart of the final pipeline: preprocessing, 50 ms band-power features, normalization, 1.5 s of context, CNN and CNN-BiGRU training, model selection, ensemble, and post-processing' },
      { after: 'results', src: '/images/bci-finger-decoding/predicted-vs-actual.jpg', alt: 'Predicted versus actual finger flexion for all five fingers on a validation segment for Subject 1. Timing of thumb and index movements is captured well, and the ring and little fingers are noisier' },
      { after: 'results', src: '/images/bci-finger-decoding/ensemble-vs-single.jpg', alt: 'Bar chart for Subject 1: single models score 0.464 to 0.530 mean correlation and the ensemble scores 0.568, above the 0.50 goal' },
    ],
    tags: ['Signal Processing', 'Deep Learning', 'Neural Interfaces', 'ECoG', 'Python', 'TensorFlow'],
  },
  {
    slug: 'steerable-needle',
    title: 'Steerable Needle Position Estimation | Multi-View Computer Vision',
    year: '2025',
    oneLiner:
      'Tracked the 3D tip of a steerable needle through reflective gel with two cameras, to ~7% relative error (2.5 mm) against a physics-based deformation model, in a setting where stereo depth failed.',
    heroImage: '/images/projects/steerable-needle/hero.png',
    role: 'Perception pipeline design, experiments, and validation',
    context: 'Aug 2025 – Dec 2025 · Graduate research project, GRASP Lab · Team of three',
    tags: [
      'Medical Robotics',
      'Computer Vision',
      'Multi-View Geometry',
      'SAM2',
      'Skeletonization',
      'Triangulation',
      'ROS',
    ],
    problem:
      'A steerable needle bends as it advances, and controlling it requires knowing where the tip is in 3D. In the lab the needle moves through a clear gel, filmed by a top camera and a side camera at 480p. The gel is the hard part: it reflects light, produces glare, and leaves the thin needle at low contrast. Stereo depth, the standard way to get 3D from two cameras, worked in open air and failed almost completely once the needle entered the gel.',
    insight:
      'Stereo disparity needs matching texture between two images, and glare destroys it. But the needle is one thin object with one tip. If each camera can find that tip in its own 2D image, the two views share an axis, and that shared axis is enough to combine them into a 3D point without any disparity matching.',
    solution:
      'I designed a two-camera perception pipeline with four stages. Segmentation: SAM2 isolates the needle from the gel in each frame. Skeletonization: the mask is thinned to a one-pixel centerline. Endpoint detection: a small convolution finds the pixels with only one neighbor, which are the tip and the base. Shared-axis triangulation: the top view gives x and y, the side view gives y and z, and matching on the shared y coordinate assembles the 3D tip position for every frame. This is a team project. My part was the pipeline design, running the experiments, and validating the result.',
    whatIBuilt: [
      'Designed the two-camera perception pipeline: segmentation (SAM2) → skeletonization → endpoint detection → shared-axis triangulation',
      'Pivoted the approach from stereo disparity to segmentation-first after glare in the gel made disparity fail',
      'Ran the experiments and validated the reconstructed tip trajectory against a physics-based deformation model: ~7% relative error (2.5 mm)',
      'Diagnosed failure modes from glare, skeleton branching, and camera frame synchronization, using overlay and side-by-side videos that made each one visible frame by frame',
    ],
    decisions: [
      'Segmentation before geometry. SAM2 produced clean needle masks even with heavy glare, where stereo disparity returned noise. Solving "where is the needle in 2D" first made the 3D step simple.',
      'Skeletonize instead of using mask edges. A centerline is stable regardless of how thick the needle appears. Edge-only masks threw away the interior and broke apart between frames.',
      'Detect the tip with a neighbor count. Convolving the skeleton with a 3×3 kernel counts each pixel\'s neighbors, and a pixel with exactly one neighbor is an endpoint. It is cheap and has no parameters to tune.',
      'Triangulate on the shared axis. Both cameras see the y axis, so tip detections are paired by their y values instead of by image features.',
      'Resample both camera streams to 15 fps before pairing. The two cameras recorded at different frame rates, and pairing unsynchronized frames produces a wrong 3D point even when both 2D detections are correct.',
    ],
    systemModes: [
      {
        name: 'Data preparation',
        items: [
          'Each experiment is logged as a ROS bag. A script extracts the two camera topics, converts them to video, and resamples both to 15 fps so frames line up',
        ],
      },
      {
        name: 'Segmentation',
        items: [
          'SAM2 with point prompts isolates the needle in each frame of both views',
        ],
      },
      {
        name: 'Skeletonization',
        items: [
          'The mask is reduced to a one-pixel centerline. The top view was clean. The side view needed extra handling because of glare near the top of the gel',
        ],
      },
      {
        name: 'Endpoint detection',
        items: [
          'A 3×3 neighbor-count kernel marks pixels with exactly one neighbor as endpoints (tip and base)',
          'False endpoints from small skeleton branches are filtered out before reconstruction',
        ],
      },
      {
        name: 'Shared-axis triangulation',
        items: [
          'Tip detections from the two views are paired by their shared y coordinate. The 3D point takes x from the top view, y from the shared axis, and z from the side view',
        ],
      },
      {
        name: 'Validation',
        items: [
          'A world coordinate frame is built from a short known translation of the needle (PCA gives the x axis, gravity gives y, the cross product gives z)',
          'The bending phase of the motion is isolated and compared against the deformation model\'s prediction',
        ],
      },
    ],
    results: [
      '~7% relative error against a physics-based deformation model: 2.5 mm distance error on a 37 mm needle',
      'Continuous 3D tip trajectory reconstructed through reflective gel at 480p, where the stereo baseline failed',
      'Three failure modes diagnosed: glare artifacts, skeleton branching, and frame synchronization',
    ],
    iteration: [
      'Stereo disparity baseline: worked in air, failed in gel because reflections and low contrast left nothing to match. This forced the pivot to segmentation-first',
      'Glare: a bright region near the top of the gel in the side view was sometimes labeled as needle, which bent the skeleton toward it',
      'Skeleton branching: abrupt lighting changes produced a small third branch and an extra false endpoint. Fixed by filtering endpoints before triangulation',
      'Frame sync: the two cameras recorded at different frame rates. Fixed by resampling both streams to a common rate',
      'Dead ends: erode and dilate cleanup distorted the needle shape, edge-only masks could not be skeletonized, and a 3D reconstruction model (VGGT) needed the needle isolated by hand first',
    ],
    outcome:
      'The pipeline recovers a continuous 3D needle-tip trajectory from two ordinary cameras, with no depth hardware. The measured bending curve tracks the deformation model to about 7%, which is strong given 480p cameras and a reflective medium.',
    learnings: [
      'When a standard method fails, look at which assumption broke. Stereo needs texture to match, and glare removed it',
      'Visualization is a debugging tool. Overlaying the skeleton and tip on the raw video exposed errors that the numbers hid',
      'Synchronize camera streams explicitly before fusing them',
    ],
    status:
      'Completed graduate research project. The pipeline runs offline. Glare in the side view is still only partly solved.',
    nextSteps: [
      'Make the pipeline real-time for closed-loop needle control',
      'Add motion and deformation priors to stabilize tracking through ambiguous frames',
      'Improve robustness to glare with better prompting, glare masking, and skeleton cleanup',
    ],
    inlineImages: [
      { after: 'solution', src: '/images/projects/steerable-needle/pipeline.png', alt: 'Pipeline overview (presentation p.3)' },
      { after: 'systemModes', src: '/images/projects/steerable-needle/skeleton-glare.png', alt: 'Skeletonization results + glare artifact (report p.6)' },
      { after: 'results', src: '/images/projects/steerable-needle/validation.png', alt: 'Model vs measured curve, 7% error (report p.13)' },
    ],
    inlineLocalVideos: [{ after: 'insight', src: '/files/steerable-needle-split-screen.mp4' }],
  },
  {
    slug: 'autonomous-turret',
    title: 'Autonomous Projectile-Launching Vehicle | Mobile Robotics',
    year: '2025',
    heroImage: '/images/autonomous-turret/hero.png',
    oneLiner:
      'A ROS robot that drives itself with stereo depth, tracks targets with vision, and aims a pan-tilt launcher. I led the mechanical design, and it performed reliably in live demos.',
    role: 'Mechanical Lead',
    context: 'Mar 2025 – Jun 2025 · UCSD ECE/MAE 148 · Team of four',
    problem:
      'The hardest part of this robot was mechanical. A pan-tilt turret has to point exactly where the vision system tells it to, while carrying a launcher, on a small vehicle that shakes when it drives. Any flex in the mounts or play in the servo linkage shows up directly as tracking error and missed shots. The turret also had to come apart quickly, because on a one-quarter schedule every hour spent on disassembly was an hour not spent debugging.',
    insight:
      'In a robot like this the mechanical design sets the ceiling for the software. Small errors in servo alignment or mounting stiffness degraded tracking more than anything in the vision code. A simple, stiff mechanism that can be rebuilt in minutes beats an optimized one that takes a day to change.',
    solution:
      'I designed a two-axis turret modeled on a C-RAM layout. A printed base housing holds the yaw servo and the servo controller and turns a disk base plate. The launcher housing mounts to that plate, holds the launcher rigidly, and carries the servo that sets pitch. A third servo pulls the trigger through a printed connector. The turret mounts on an autonomous car running ROS 2. In driving mode the car uses an OAK-D stereo depth camera to drive down a hallway and stop before the wall. In sentry mode the turret scans 180°, locks onto a red target with color masking, tracks it, and fires when a human operator confirms.',
    whatIBuilt: [
      'Led mechanical design for the team: the pan-tilt turret, the launcher enclosure, the servo baseplate mount, and the trigger actuation',
      'Designed the turret for rigidity, so the launcher points where the servos command, and for fast disassembly, so parts could be swapped during debugging',
      'Designed the servo-driven trigger mechanism: a third servo pulls the trigger through a printed connector',
      'Reworked an off-the-shelf gel blaster to fit: stripped it to its internals, printed a new ammo container that reuses the existing feeder, and cut the footprint down until it could mount on the car',
      'Iterated the enclosure and servo mount through many CAD revisions to improve stiffness, alignment, and access',
      'Worked with the perception and ROS side so the turret\'s motion matched the tracking output',
    ],
    decisions: [
      'Servo actuation over a more complex firing mechanism. A servo pulling the existing trigger is simple and repeatable, which made it the reliable choice on a short schedule.',
      'Rigidity first. The structure was designed for stiffness and repeatability, because flex between the servos and the launcher turns directly into aiming error.',
      'Fast disassembly. The turret was designed to come apart quickly so parts could be changed between test runs.',
      'Function over looks. A clean enclosure was a nice-to-have. Repeatable aim was the requirement.',
    ],
    systemModes: [
      {
        name: 'Driving mode',
        items: [
          'An OAK-D stereo camera measures depth from the shift between its two views',
          'A ROS node processes the depth data and publishes motor commands',
          'The car drives straight down a hallway and stops automatically when it gets close to the wall',
        ],
      },
      {
        name: 'Sentry mode',
        items: [
          'The operator enables sentry mode with a button press',
          'The turret pans 180° looking for a target, using two servos for yaw and pitch',
          'Color masking locks onto red and the turret follows the target as it moves',
          'Tracking: the frame is converted to HSV and masked, the target contour is fitted with a circle, and a PD loop with a deadzone turns the pixel error into pan and tilt servo commands',
        ],
      },
      {
        name: 'Firing',
        items: [
          'Once the turret has locked on, the human operator chooses whether to fire',
          'The trigger servo fires for one second, averaging about 4 gel projectiles per actuation',
        ],
      },
    ],
    results: [
      'Working prototype that navigated, tracked, and fired reliably in live demos',
      'Navigation delivered on stereo depth after the GPS approach was dropped',
    ],
    iteration: [
      'The pivot from GPS to depth: the original plan was to drive to GPS waypoints, but the ROS GPS navigation node had no usable documentation. We switched to depth-based hallway navigation with the car\'s stereo camera',
      'Lidar was considered as a replacement and cut, because bringing up a new sensor in the one week left was not realistic',
      'The first plan used a simple projectile launcher. Moving to an enclosed launcher avoided projectile-motion calculations but made the housing more complex than expected, which drove most of the CAD revisions',
      'Driving and sentry modes run separately. Running them together needs a second camera and a coordinator node',
    ],
    outcome:
      'The team delivered a robot that drives a hallway on its own, finds and tracks a target, and fires on operator confirmation. It worked in live demos, and the mechanical design held up under real use.',
    learnings: [
      'Mechanical design is often the bottleneck in an autonomous system',
      'Iteration speed beats an over-engineered first design',
      'Integration takes longer than any single subsystem. Work on subsystems in parallel',
    ],
    status: 'Completed (Jun 2025).',
    nextSteps: [
      'Integrate driving and sentry modes so the turret scans while the car moves, with a second camera and a coordinator node',
    ],
    inlineImages: [
      { after: 'solution', src: '/images/autonomous-turret/demo-turret.jpg', alt: 'The finished robot in a hallway: pan-tilt turret mounted on the car, with the operator laptop behind it' },
      { after: 'whatIBuilt', src: '/images/autonomous-turret/servo-baseplate-mount-cad.jpg', alt: 'CAD of the servo baseplate mount: two side plates on a rotating base that carry the pitch axis' },
      { after: 'whatIBuilt', src: '/images/autonomous-turret/launcher-enclosure-cad.jpg', alt: 'CAD of the launcher enclosure that holds the launcher on the pitch axis' },
      { after: 'whatIBuilt', src: '/images/autonomous-turret/trigger-actuator-cad.jpg', alt: 'CAD of the printed connector the trigger servo uses to pull the trigger' },
      { after: 'whatIBuilt', src: '/images/autonomous-turret/launcher-internals.jpg', alt: 'Internals of the launcher on the bench, opened up next to its electronics box' },
      { after: 'decisions', src: '/images/autonomous-turret/enclosure-v1.jpg', alt: 'CAD of the first turret enclosure iteration' },
      { after: 'systemModes', src: '/images/autonomous-turret/demo-hallway.jpg', alt: 'Driving mode in the demo: the robot in a hallway, with the camera view and the stereo depth map shown alongside' },
      { after: 'systemModes', src: '/images/autonomous-turret/pan-tilt-tracking.png', alt: 'Sentry mode: the tracking window locked onto a red target, with sentry and fire controls' },
      { after: 'iteration', src: '/images/autonomous-turret/car-base.jpg', alt: 'The original car before the turret, with camera, GPS, and Jetson computer labelled' },
      { after: 'iteration', src: '/images/autonomous-turret/launcher-original.jpg', alt: 'The original simple projectile launcher on its stand, before the enclosed design' },
    ],
    inlineVideos: [{ after: 'results', youtubeId: 'QEE1iDBzJlU' }],
    links: [{ label: 'Demo Video', href: 'https://youtu.be/QEE1iDBzJlU' }],
    tags: ['Mechanical Design', 'CAD', 'ROS', 'Computer Vision', 'Servo Actuation', 'Rapid Prototyping'],
  },
  {
    slug: 'ambient-ai-clinical-documentation',
    title: 'Ambient AI Clinical Documentation',
    year: '2025',
    heroImage: '/images/ambient-ai-clinical-documentation/hero.png',
    oneLiner:
      'Evaluated an AI scribe pilot at the Children\'s Hospital of Philadelphia and found automation bias to be the top risk. The deliverable was a gated, human-in-the-loop workflow and an implementation checklist.',
    role: 'Human-Systems Evaluation',
    context: 'Aug 2025 – Dec 2025 · University of Pennsylvania · Team of six',
    problem:
      'Clinicians spend a large share of each visit typing notes, which costs face time with patients and contributes to burnout. An ambient AI scribe listens to the visit and drafts the note. The Children\'s Hospital of Philadelphia was piloting one, and the question was whether and how it should be deployed more widely: does it reduce workload, and what new risks does it introduce?',
    insight:
      'The top risk is automation bias: a clinician signing an AI-drafted note without really reading it. Both interviewees raised it independently, one from outside the pilot and one running it. That makes deployment design, more than model quality, the thing that decides whether the tool is safe.',
    solution:
      'We evaluated the pilot through two stakeholder interviews and a patient survey, then turned the findings into a gated workflow. The clinician verifies consent, starts the recording, sees a visible indicator, runs the visit, stops the recording, then reviews and edits the AI draft. A mandatory review step sits between the draft and the legal medical record, so no note is filed without a human reading it.',
    whatIBuilt: [
      'Interviews with a human systems engineer at the hospital who was not involved in the pilot, and with the executive overseeing it',
      'A patient survey on comfort with recording, trust in AI, and preferences for rollout',
      'The gated human-in-the-loop workflow',
      'An implementation checklist in seven parts: room and hardware setup, patient consent, clinician workflow, data privacy and governance, training, feedback loops, and rollout strategy',
    ],
    results: [
      'Automation bias identified as the top risk by both interviewees',
      'Patients were most concerned about privacy. They wanted a visible recording indicator, explicit opt-in, and the ability to pause or stop at any time, and most said they would still opt in',
      'Checklist safeguards against over-reliance: mandatory review before a note is filed, audits of signed notes, and rotating manual and AI-assisted documentation days so clinicians keep the skill',
    ],
    learnings: [
      'An AI tool that observes people in a sensitive setting needs visible status, explicit consent, and a human gate before its output counts',
      'People close to a pilot and people outside it weigh the same risks very differently. Interview both',
    ],
    status: 'Completed (Dec 2025).',
    inlineImages: [
      { after: 'solution', src: '/images/ambient-ai-clinical-documentation/ambient-system-diagram.png', alt: 'Ambient system diagram: stakeholders, effects, implementation, and risks' },
      { after: 'whatIBuilt', src: '/images/ambient-ai-clinical-documentation/doug-hock-interview.png', alt: 'Doug Hock interview: plan and execution (VP and System COO at CHOP, oversees Ambient pilot)' },
      { after: 'whatIBuilt', src: '/images/ambient-ai-clinical-documentation/patient-questionnaire.png', alt: 'Patient questionnaire: perceptions of an Ambient AI clinical documentation system' },
    ],
    tags: ['Human Factors', 'AI Safety', 'Healthcare', 'Workflow Design'],
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
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
