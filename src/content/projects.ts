export type Project = {
  slug: string
  title: string
  /** True when the part of the title before " | " is the project name (the default treats it as the organisation). */
  nameFirst?: boolean
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
    slug: 'irix-coach',
    title: 'IRIX | An App That Optimizes Your Health',
    year: '2026',
    heroImage: '/images/irix-coach/hero.jpg',
    oneLiner:
      'An iOS app that uses your own wearable data to optimize your health. Each morning it turns last night into one word and three decisions, in under 30 seconds. No score, no streaks, no feed. In TestFlight beta.',
    role: 'Co-Founder',
    context: 'Jul 2026 – Present · iOS app in TestFlight beta · Built with my co-founder',
    tags: ['Product Design', 'iOS', 'SwiftUI', 'HealthKit', 'Wearable Data', 'On-Device Computation', 'UX'],
    problem:
      'People who train and wear an Apple Watch, WHOOP, Oura, or Garmin get a lot of data and little direction. Wearables report numbers like HRV, sleep stages, and a 0 to 100 readiness score, then leave the decision to the user. People either ignore the data or obsess over the score. There is no real difference between a 67 and a 71 if neither one tells you what to do differently today.',
    insight:
      'Optimizing your health is not about one big change. It mostly turns on small daily decisions: how hard to train, when to stop caffeine, when to be asleep. A product that wants to improve someone\'s health has to get those decisions right every day, using that person\'s own data, and it has to be quick enough that they keep doing it. Sleep is the one health signal that arrives while you were away, so the morning is the moment to do it.',
    solution:
      'IRIX uses each person\'s own data to tell them how to run their day for better health. It reads last night from Apple Health, which Apple Watch, WHOOP, Oura, and Garmin all write to. The daily touchpoint is a short morning check-in. A notification carries one state word. Opening it takes about 30 seconds: four quick questions about yesterday, a verdict screen with the night as a ribbon of sleep stages and one word (PUSH, STEADY, EASE, or RESTORE) with a sentence explaining why, then three decision cards to accept, adjust, or decline. The plan collapses into a day view, and the app goes quiet until one of the committed times, such as "Last coffee in 15 minutes."',
    whatIBuilt: [
      'Own product and the technical roadmap, and build the app with my co-founder',
      'The morning loop: notification, yesterday check-in, verdict, three decisions, day view. It resumes where you left off if the app is closed and expires at noon',
      'A menu of nine daily decisions the user picks three from: training effort, bedtime, last caffeine, wind down, last meal, nap, fuel, water, and caffeine amount',
      'An on-device engine that computes each morning\'s plan from the user\'s own baselines. The cloud is a one-way mirror and the morning loop never depends on it',
      'Coach, an AI chat grounded in the user\'s own data, with a written daily report and plan changes proposed as cards the user accepts or declines',
      'Body, a 30-day view of sleep rhythm and six metrics, each shown against the user\'s own normal',
      'Onboarding that backfills sleep history silently and opens with one real finding mined from the user\'s own nights',
    ],
    decisions: [
      'A 30-second ceiling on the morning flow. A ritual only survives if it is shorter than the excuse to skip it, so every design question resolves toward protecting that limit.',
      'No 0 to 100 score. One state word and comparisons like "38 minutes under your normal" instead. A single number invites ranking your body against itself in ways the data cannot support.',
      'Three decisions the user chose, in a fixed order. The morning reads the same every day. The engine can add one fourth card on a day that earns it, with a line saying why and no badge.',
      'Honest data. Measured, self-reported, and inferred values are worded differently, such as "Detected: lift, 6:04 PM" versus "Based on what you told us." Charts never draw structure the data does not contain.',
      'Declining is allowed, and the app shows the consequence plainly instead of nagging.',
      'Works from the first night. Baselines form from backfilled history, and a calibrating state is shown until 14 nights exist.',
      'Compute on the device. The engine is a standalone Swift package with no UI or network dependencies, so the plan is deterministic, testable, and available offline.',
      'No red, no icons, no emoji. Words carry the meaning, with one gold accent for the moment the plan is set.',
      'Silence after the ritual. The app only speaks again at times the user committed to.',
    ],
    systemModes: [
      {
        name: 'Data path',
        items: [
          'Apple Health → night assembly with validity checks (duration, gaps, timezone, travel, daylight saving) → local store → engine → plan',
          'The plan drives the morning screens, the notification schedule, and a home-screen widget',
          'A one-way sync mirrors data to the cloud. It is read back only when signing in on a fresh install',
        ],
      },
      {
        name: 'Engine',
        items: [
          'Per-metric baselines built from each user\'s own history, so every comparison is against their normal, not a population average',
          'Independent producers each propose a value for a decision, and a resolver arbitrates them in dependency order. Changing bedtime moves the decisions that depend on it',
          'Every recommendation records its outcome: accepted, adjusted, declined, or missed',
        ],
      },
      {
        name: 'Coach',
        items: [
          'Answers questions from the user\'s own data, and replies stream as they are generated',
          'Guardrails run both on the server and on the device, and the server\'s result is authoritative',
          'What Coach remembers about the user is visible and removable in Profile',
        ],
      },
    ],
    results: [
      'In TestFlight beta with a small group of friends since September 2026',
      'Full morning loop, Coach, Body, and Profile shipped on the main branch',
      'More than 1,100 automated tests across the app and the engine, including an end-to-end run of a synthetic user with 154 nights of history',
      'Beta feedback is triaged into tracked issues and fed back into the design',
    ],
    iteration: [
      'The app was rebuilt from scratch in August 2026. The first version was an AI booking agent with a staff console. The rebuild narrowed it to the morning ritual',
      'Three fixed cards became three chosen from a menu of nine, plus an occasional fourth. A "today only" badge on the fourth was tried and dropped because it read like a promotion',
      'Coach started as a separate landing screen with suggested prompts and became one scrolling feed with the daily report at the top',
      'Beta testers found that the caffeine cutoff treated a green tea like a large coffee. Usual caffeine intake is now a setting',
      'A tester could not tell which build they were on, so a build stamp was added to Profile',
      'A workout-time step looped back to "Will you train?" after accepting a time, and once suggested a time that had already passed. Both were fixed',
    ],
    outcome:
      'IRIX today is this app: a coach that turns wearable data into the daily decisions that improve your health. It is being tested on its own before the gym layer is built. The business model is still B2B: the app is meant to pair with a member\'s own gym, so classes and recovery sessions can be booked from the day\'s plan. That layer is not built yet.',
    learnings: [
      'Constraints are the product. The 30-second ceiling and the no-score rule decide more design questions than any feature list',
      'Wording is an engineering problem. Keeping measured, reported, and inferred claims distinct had to be enforced in code and tests, not left to copy review',
      'Narrowing the product was the hard decision. The rebuild removed more than it added, and the morning check-in became the way in to a broader health coach',
    ],
    status: 'In TestFlight beta. Gym pairing and booking are the next phase.',
    nextSteps: [
      'Build the gym connection: booking a class or recovery session at the member\'s own gym from the day\'s plan',
      'Redesign the Body tab, which testers found cramped and passive',
      'A clearer way to edit tomorrow\'s plan',
    ],
    inlineImages: [
      { after: 'solution', src: '/images/irix-coach/morning-flow.jpg', alt: 'The morning flow in four screens: yesterday check-in, the verdict STEADY with a sleep-stage ribbon, three decision cards for training effort, bedtime, and last caffeine, and the day view with the plan' },
      { after: 'whatIBuilt', src: '/images/irix-coach/onboarding.jpg', alt: 'Onboarding screens: the opening "Wake up knowing" screen, history backfill counting 412 nights, a finding that Friday nights ran past midnight, and the menu for choosing three daily decisions' },
      { after: 'systemModes', src: '/images/irix-coach/tabs.jpg', alt: 'Body tab with 30-day sleep rhythm and six metric tiles, the Coach feed with today\'s report, and a Coach conversation answering "Should I still lift tonight?"' },
    ],
    links: [{ label: 'Website', href: 'https://tryirix.com' }],
  },
  {
    slug: 'irix',
    title: 'IRIX | Smart Glasses and Gym Tracking Prototypes',
    year: '2026',
    oneLiner:
      'Two working sensing systems for the gym floor: smart glasses that read plate loads and count reps, and a camera and wristband tracker that fuses video with motion data. Plus the decision that led from both to the IRIX app.',
    heroImage: '/images/projects/irix-hero.png',
    heroImagePosition: 'left',
    heroImageScale: 1.4,
    inlineImages: [
      { after: 'solution', src: '/images/projects/irix-hud-ring.png', alt: 'Smart glasses, the form factor the first coaching prototype was built for' },
      { after: 'systemModes', src: '/images/irix/plate-loading.jpg', alt: 'First-person camera frame from a demo session: loading plates onto the bar, the view the vision model reads the load from' },
      { after: 'systemModes', src: '/images/irix/rep-signal.jpg', alt: 'Raw accelerometer and gyroscope traces from the glasses motion sensor during a set, with the repeating pattern of each rep visible' },
      { after: 'systemModes', src: '/images/irix/tracking-dataflow.svg', alt: 'Data flow of the camera and wristband tracking system: wristband, gateways, edge server, identity fusion, camera pipeline, rep and exercise models, app and dashboard' },
      { after: 'results', src: '/images/irix/demo-hud.jpg', alt: 'Frame from an IRIX demo video: first-person view at a squat rack with the display overlay showing exercise, load, rep count, and set' },
    ],
    inlineVideos: [{ after: 'problem', youtubeId: 'YdCnRnITyKg' }],
    role: 'Co-Founder',
    context: 'Feb 2026 – Jul 2026 · San Francisco, CA',
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
      'I built this in three steps. First, a smart-glasses coaching prototype that uses the camera to verify setup and read the load, then hands off to the motion sensor to count reps. Second, a multi-camera and wristband tracking system that fuses video and motion data so tracking survives occlusion. Third, after pricing out what it takes to deploy sensing hardware in a real gym, an app-based coach that runs on Apple Watch, WHOOP, Garmin, and Oura data, which is the product IRIX ships today and has its own case study.',
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
    links: [{ label: 'See the IRIX app', href: '/work/irix-coach' }],
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
    slug: 'robot-sim-test-harness',
    title: 'Robot Arm Kinematics and Simulation Testing | Franka Panda',
    nameFirst: true,
    year: '2026',
    heroImage: '/images/robot-sim-test-harness/hero.jpg',
    oneLiner:
      'Kinematics for a 7-joint Franka Panda arm, tracking a figure-eight on the real robot to about 1 cm, followed by an automated test harness that checks a two-arm robot simulation before other teams build on it.',
    role: 'Kinematics labs (pairs) and Simulation Quality Control (team of four)',
    context: 'Jan 2026 – May 2026 · Penn MEAM 5200, Introduction to Robotics',
    tags: ['Robotics', 'Kinematics', 'Franka Panda', 'ROS', 'Gazebo', 'Test Automation', 'Python'],
    problem:
      'The course had two halves. The first was making a 7-joint arm go where you tell it: computing where the hand is from the joint angles, and the much harder reverse, finding joint angles that put the hand at a target pose, on a real Franka Panda. The second was the final project, one shared system: a robot cell with two Franka arms, a turntable between them, six dispensers with spring-return levers, and a cup, built in simulation by one team while other teams wrote the scheduling and robot control on top of it. If the simulator misbehaves, every team downstream debugs the wrong thing. Our team was responsible for proving the simulator behaves the way it claims to, under normal use, at the edges, and when things go wrong. The hard part is that a physics simulator is not perfectly repeatable, so a test that is too strict fails for no reason and a test that is too loose catches nothing.',
    insight:
      'Test the simulator the way a downstream team will use it, but without depending on any of their code. If the tests set the state of the world directly and read it back through the same standard interfaces everyone else uses, they can run before the control code exists and they keep working when it changes.',
    solution:
      'For the arm, we wrote forward kinematics from a Denavit–Hartenberg table, the Jacobian, a velocity solver for following a moving target, and a numerical inverse kinematics solver, then ran them in simulation and on the physical robot. For the final project, we built a base test harness that wraps the ROS and Gazebo service calls, provides assertion helpers with tolerances, and logs every result to JSON. Seven test suites sit on top of it: one for each part of the scene (scene spawning, the cup, the dispenser levers, the turntable, the two arms), one for integration scenarios that use several parts at once, and one for stress. A single runner executes everything and writes a combined pass/fail report.',
    whatIBuilt: [
      'Forward kinematics for the Panda with a lab partner: a Denavit–Hartenberg table for all seven joints, the chain of transforms to the end effector, and the position of every joint, checked by hand one joint at a time and then against the simulator and the physical arm',
      'Velocity kinematics with a lab partner: the Jacobian and a least-squares solver that turns a desired hand velocity into joint velocities, and ignores any direction left unconstrained',
      'Numerical inverse kinematics with a lab partner: an iterative solver that steps toward the target pose with the Jacobian pseudo-inverse while a secondary task keeps joints near the middle of their range, projected into the null space so it cannot disturb the main task',
      'Worked in a team of four on the test plan and the harness. The team defined each test case up front with its initial conditions, input sequence, expected output, and tolerance, so other teams could use the scenarios early',
      'Base harness: service connections, assertions for position, joint angle, model existence, and whether the cup is upright, and a result log with the measured error for every check',
      'Component suites: all eight scene objects spawn where the configuration says, the cup obeys friction and stays upright, each dispenser lever deflects and springs back within its joint limits, the turntable starts, stops, reverses, and scales speed, and both arms are present with readable joints',
      'Integration suite: the cup stays on the turntable while it spins, settles when it stops, a dispenser can be pressed during a spin, and both arms stay intact through a full stop, spin, stop cycle',
      'Stress suite: rapid turntable speed changes, ten rapid cup moves, all six dispensers pressed at once, a fast 5 rad/s spin, direction reversal, and 100 rapid state queries with under 5% allowed to fail',
    ],
    decisions: [
      'Define the target orientation relative to where the arm starts. Tracking was poor at first because the target used a fixed rotation that did not match the arm\'s starting pose, so the controller spent the whole run fighting an error that should not have existed. Computing the target from the starting pose removed it.',
      'Raise the gains, then relax the joint velocity limits. Position and orientation gains went from 10 to 50, and the velocity limit from 0.25 to 0.5 rad/s, because the joints were saturating before the controller could catch up.',
      'Keep joints centered in the null space. A 7-joint arm has a spare degree of freedom, and using it to stay away from joint limits makes solutions safer to run on hardware.',
      'No dependency on the robot control code. Tests place objects with a set-state call and verify with a get-state call, so they run on the simulator alone.',
      'Tolerances for continuous values, exact matches for discrete ones. Positions and angles pass within an error band, 5 cm for positions by default. States like "model exists" must match exactly.',
      'Different tolerances for different physics. Two dispensers have an active spring controller and four rely on the simulator\'s passive spring, so the passive ones get a looser return tolerance and a longer settling time.',
      'Measure motion over a time window for the turntable. Its controller takes a speed, not an angle, so a test cannot wait for a target position and instead checks how far the joint moved in a fixed time.',
      'Check every constant against the source. Expected positions, joint names, and limits were read from the simulation team\'s own model and launch files, not from their change notes.',
    ],
    results: [
      'Figure-eight tracking on the physical arm with position and orientation controlled: 1.08 cm mean position error, 1.78 cm maximum, about 3.9° mean orientation error',
      'The same trajectory in simulation: 0.8 mm mean position error and 0.09° mean orientation error',
      'Forward kinematics matched tape-measure checks on the physical arm to within about 17% on the worst axis',
      'Inverse kinematics found valid solutions for 4 of 6 simulated target poses. The two failures were poses near the edge of the workspace, and changing the starting guess did not help',
      'Seven test suites and a single runner for the final project, tested against the simulation team\'s latest environment',
      'Early validation of the core setup passed: both arms publish state, initialize independently, and commanding one does not move the other',
      'Both arms reached their neutral pose with steady-state error on the order of 0.00001 rad, and repeated trials gave nearly identical results',
      'Joint limit violations were clipped and the table-proximity safety check aborted unsafe motions, as intended',
    ],
    iteration: [
      'The two inverse kinematics failures were the useful result. Both targets asked the arm to reach far out with the wrist bent sharply back, which needs joint angles near their limits. The joint-centering task pushes away from exactly those angles, so the solver stalled instead of producing a contorted pose',
      'Started the final project by checking that the simulation ran at all: connectivity, frames, controllers. Then moved to a consistent framework that tests each part and how the parts behave together',
      'Picking tolerances and timing was the main difficulty, because the simulator is not perfectly consistent from run to run',
      'Some planned tests, such as scheduler-side scripts, depended on other teams having their interfaces ready',
    ],
    learnings: [
      'Get the reference frames right before touching gains. The biggest tracking improvement came from fixing how the target was defined',
      'Simulation flatters a controller. The same code that tracked to under a millimeter in simulation tracked to about a centimeter on hardware',
      'A test is only as good as its tolerance. Too tight and it cries wolf, too loose and it is decoration',
      'Decoupling the tests from the code under development let testing start weeks before integration',
      'On a multi-team project, a shared, written definition of "expected behavior" is as valuable as the tests themselves',
    ],
    status: 'Completed (May 2026).',
    inlineImages: [
      { after: 'solution', src: '/images/robot-sim-test-harness/ik-solvers-diagram.jpg', alt: 'Diagram of the two solvers: the velocity solver computes the Jacobian, masks unconstrained directions, and solves least squares. The position solver iterates a primary task, a joint-centering task, and a null-space combination until it converges' },
      { after: 'whatIBuilt', src: '/images/robot-sim-test-harness/fk-validation.jpg', alt: 'Forward kinematics check for three arm configurations: the computed joint positions plotted in 3D above the same pose in the simulator' },
      { after: 'results', src: '/images/robot-sim-test-harness/tracking-sim.jpg', alt: 'The simulated Panda arm tracing a figure-eight (left) and a straight line (right) with its end effector' },
      { after: 'systemModes', src: '/images/robot-sim-test-harness/harness-structure.svg', alt: 'Structure of the test harness: seven test suites on a shared base harness, run against the simulated cell with two arms, a turntable, six dispensers, and a cup' },
    ],
    inlineVideos: [{ after: 'results', youtubeId: 'vjuTs2oQL8s' }],
    systemModes: [
      {
        name: 'Velocity solver',
        items: ['Jacobian → drop unconstrained directions → least-squares solve for joint velocities'],
      },
      {
        name: 'Position solver',
        items: [
          'Pose error as a displacement and a rotation → pseudo-inverse step toward the target → add joint centering through the null space → repeat',
          'Stops when position is within 0.1 mm and orientation within 0.001 rad, or after 1000 iterations',
        ],
      },
      {
        name: 'Test harness',
        items: ['Seven suites call a shared base harness, which talks to the simulator, applies tolerances, and logs every result'],
      },
    ],
  },
  {
    slug: 'steerable-needle',
    title: 'Steerable Needle Position Estimation | Multi-View Computer Vision',
    nameFirst: true,
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
      { after: 'solution', src: '/images/projects/steerable-needle/pipeline.png', alt: 'The pipeline: recorded video, segmentation, skeletonization, endpoint detection, 3D matching, and filtering' },
      { after: 'systemModes', src: '/images/projects/steerable-needle/skeleton-glare.png', alt: 'Skeletonization results, with the glare artifact in the side view that bends the skeleton' },
      { after: 'results', src: '/images/projects/steerable-needle/validation.png', alt: 'Measured bending curve against the deformation model\'s prediction, about 7% error' },
    ],
    inlineLocalVideos: [{ after: 'insight', src: '/files/steerable-needle-split-screen.mp4' }],
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
      'The top risk is automation bias: a clinician signing an AI-drafted note without reading it properly. Both interviewees raised it independently, one from outside the pilot and one running it. That makes deployment design, more than model quality, the thing that decides whether the tool is safe.',
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
      'People close to a pilot and people outside it weigh the same risks differently. Interview both',
    ],
    status: 'Completed (Dec 2025).',
    inlineImages: [
      { after: 'solution', src: '/images/ambient-ai-clinical-documentation/ambient-system-diagram.png', alt: 'Ambient system diagram: stakeholders, effects, implementation, and risks' },
      { after: 'whatIBuilt', src: '/images/ambient-ai-clinical-documentation/doug-hock-interview.png', alt: 'Interview plan for the executive who oversees the pilot' },
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
      'A cutting board with measured containers built in underneath, so ingredients go straight from the knife into a portioned box. Prototyped and tested with real users.',
    role: 'Product Design Engineer',
    context: 'Aug 2025 – Dec 2025 · Penn human-centered product design course',
    problem:
      'Meal prep makes a mess in predictable ways. Loose ingredients pile up around the board, everything gets moved twice (board to bowl, bowl to plate), and portions are guessed. A normal cutting board is designed for cutting only, not for the whole prep workflow around it.',
    insight:
      'People care about the workflow more than the finish. Even with a rough prototype, testers immediately understood and liked cutting straight into a measured container. What they did not forgive was anything that felt loose. Modularity only works if it feels mechanically solid.',
    solution:
      'PrepCaddy puts detachable, standard-size containers directly beneath the cutting surface. You cut ingredients into a measured box, move the whole portion in one motion, and stage ingredients without covering the counter. The cutting surface can also expand for larger prep. The goal was to remove steps, so the work went into prototyping and user testing, not appearance.',
    whatIBuilt: [
      'A proof-of-concept physical prototype in low-fidelity materials, built rough on purpose so it could change quickly',
      'Tests of box placement and sizing, how transfer feels in the hand, and whether people could work out the features without being told',
      'User testing with a simple prep task, cutting and transferring apples, and a set of design changes drawn from what testers said and did',
    ],
    decisions: [
      'Test the interaction before the finish. A rough prototype that people can actually cook with teaches more than a polished one they can only look at.',
      'Standard container volumes, so the board doubles as a way to portion.',
      'Keep it simple enough to understand without instructions.',
    ],
    results: [
      'Testers understood what the boxes were for without explanation',
      'Less mess than a traditional board, and moving a full box felt controlled',
      'The standard volumes helped with portioning',
      'Pain points: the boxes did not snap securely into place, the expanded cutting surface did not feel sturdy, the seams looked hard to clean, and there was no obvious place to put the knife down',
    ],
    iteration: [
      'Replace the friction-fit boxes with a snap-in or magnetic attachment',
      'Reinforce the expansion mechanism, or remove it if it cannot be made stable',
      'Add knife storage outside the cutting zone',
      'Simplify the seams so they are easier to clean',
    ],
    learnings: [
      'Function wins over form early on. Testers valued what the board did even when it looked rough',
      'Modularity has to feel solid or people stop trusting it',
      'Small details, like where the knife goes, decide whether a physical workflow feels right',
    ],
    status: 'Completed (Dec 2025).',
    nextSteps: [
      'Design a proper mechanical attachment for the boxes',
      'Build a mid-fidelity prototype in food-safe materials',
      'Test with longer prep sessions and several ingredients',
      'Evaluate cleaning, storage, and durability over time',
    ],
    inlineImages: [
      { after: 'solution', src: '/images/prepcaddy/poster.png', alt: 'PrepCaddy poster showing the detachable transfer cups, the removable cutting lid, and easy cleaning' },
    ],
    tags: ['User Research', 'Rapid Prototyping', 'Product Design', 'Human-Centered Design'],
  },
  {
    slug: 'mri-headphones',
    title: 'SoundImaging | MRI Pneumatic Headphones',
    year: '2025',
    heroImage: '/images/mri-headphones/hero.png',
    heroImagePosition: 'top',
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
    slug: 'autonomous-turret',
    title: 'Autonomous Projectile-Launching Vehicle | Mobile Robotics',
    nameFirst: true,
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
    slug: 'autonomous-car',
    title: 'Autonomous RC Car | Lane Following, GPS, and Vision',
    nameFirst: true,
    year: '2025',
    heroImage: '/images/autonomous-car/hero.jpg',
    oneLiner:
      'Built a small autonomous car from a kit and got it driving laps on its own: a neural network trained to drive in simulation, camera lane following with a tuned PID steering controller, GPS laps, and a face recognition model we trained ourselves.',
    role: 'Mechanical Lead',
    context: 'Mar 2025 – May 2025 · UCSD ECE/MAE 148 · Team of four',
    tags: ['Autonomous Vehicles', 'ROS 2', 'PID Control', 'Computer Vision', 'Model Training', 'CAD', '3D Printing'],
    problem:
      'The class hands each team a bare RC chassis, a single-board computer, a depth camera, and a GPS unit, and ten weeks to make it drive itself. Before the final project, the car has to earn its autonomy step by step: it has to be built, wired, and mounted so the sensors hold still, then follow a lane with a camera, then lap a course on GPS. The hardest part is the lane follower. A camera on a small, fast car sees glare, shadows, and two kinds of line, and a steering controller that is tuned too hot oscillates across the lane while one tuned too soft runs wide on the curves.',
    insight:
      'Most of what looks like a control problem is a calibration problem. If the color filter picks out the lines cleanly and the steering limits match what the servo can actually do, a simple PID controller is enough. If they do not, no amount of gain tuning fixes it.',
    solution:
      'We built the car, then brought up each capability in turn. First, each of us trained a neural network to drive: you drive laps by hand in a simulator, the network learns to map camera images to steering and throttle, and then it has to complete three laps on its own. For lane following on the real car, the camera image is filtered by color to isolate the lane lines, the offset of the line from the image center becomes the error, and a PID controller turns that error into a steering command with separate throttle values for straights and turns. The same car then ran three GPS laps for the midterm and hosted the vision work that fed the final project: a face recognition model trained on our own team, and hand-gesture recognition on the depth camera.',
    whatIBuilt: [
      'Led the mechanical build as the team\'s mechanical engineer: drew the electronics mount plate and designed 3D-printed parts for the car, including a spoiler wing that went through two versions',
      'Trained a neural network driving model in the DonkeyCar simulator from my own driving data and ran three autonomous laps with it, first on my machine and then on the class\'s remote server',
      'Lane following on the outdoor track: calibrated the color filter for the yellow and white lines and tuned the PID steering controller and throttle values, first on a test stand and then on the track',
      'Tuned the steering limits (maximum left, straight, maximum right) when the car over-corrected, instead of only lowering gains',
      'Ran the car through center-lane and left-lane following laps',
      'Vision on the depth camera: the team trained a face recognition model on photos of ourselves, which labels each teammate by name with a confidence score. We then tried hand-gesture recognition with a pretrained model that returns one of eight gestures',
    ],
    decisions: [
      'Tune on the test stand first. The PID steering and throttle values were checked with the wheels off the ground before any autonomous run, so a bad gain could not send the car into a wall.',
      'Fix over-correction at the steering limits. When the car made steering moves that were too large, the first change was the calibrated steering range, because gains tuned around a wrong range do not transfer.',
      'Give each car its own ROS domain. Cars on the same network were receiving each other\'s commands, so we changed our domain ID to isolate ours.',
      'Schedule the throttle. The car uses different throttle values depending on how hard it is steering, so it holds the lane through the curves and still makes time on the straights.',
    ],
    systemModes: [
      {
        name: 'Learned driving in simulation',
        items: [
          'Drive laps by hand in the simulator to record camera frames with the steering and throttle used',
          'Train a small neural network on that data to predict steering and throttle from the image',
          'Run the trained model as the driver and complete three autonomous laps',
        ],
      },
      {
        name: 'Lane following',
        items: [
          'Camera frame → color filter for the lane lines → line position relative to image center → PID steering command',
          'Throttle values scheduled alongside the steering command',
          'Runs as ROS 2 nodes on the car\'s on-board computer',
        ],
      },
      {
        name: 'GPS laps',
        items: ['The car laps a course using its GPS unit. Three laps for the class midterm, then tuned for speed'],
      },
      {
        name: 'Vision',
        items: [
          'A face recognition model trained on the team, running on the depth camera\'s color stream',
          'Hand-gesture recognition, explored as the command input for the final project',
        ],
      },
    ],
    results: [
      'Three autonomous laps in simulation with my trained driving model, locally and on the remote server',
      'The car followed the lane around the outdoor track on its own, in both center-lane and left-lane modes',
      'Three laps on GPS',
      'The face recognition model identified each of the four teammates by name',
      'The same platform went on to carry the turret for the final project',
    ],
    learnings: [
      'Calibrate before you tune. Clean inputs and correct actuator limits make a simple controller work',
      'Test stands save hardware. Every new controller ran with the wheels in the air first',
      'A rigid, well laid-out electronics plate matters more than it looks. Loose sensors show up as noise in everything downstream',
    ],
    status: 'Completed (May 2025). The car became the base for the Autonomous Projectile-Launching Vehicle.',
    inlineImages: [
      { after: 'systemModes', src: '/images/autonomous-car/donkeysim-laps.jpg', alt: 'Screen capture of my trained model driving autonomous laps in the DonkeyCar simulator, with the camera view on the left' },
      { after: 'solution', src: '/images/autonomous-car/track-curve.jpg', alt: 'The car following the lane through a curve on the outdoor track' },
      { after: 'solution', src: '/images/autonomous-car/track-close.jpg', alt: 'The car on the track with its camera mast and electronics plate visible' },
      { after: 'whatIBuilt', src: '/images/autonomous-car/spoiler-v2-cad.jpg', alt: 'CAD of the 3D-printed spoiler wing for the car, second version' },
      { after: 'results', src: '/images/autonomous-car/track-straight.jpg', alt: 'The car holding the lane on the long straight of the track' },
    ],
    inlineLocalVideos: [{ after: 'results', src: '/files/lane-following.mp4', caption: 'Lane following on the outdoor track, May 2025' }],
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
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
