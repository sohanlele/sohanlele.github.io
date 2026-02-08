'use client'

import { 
  Cpu, 
  Settings, 
  Wrench, 
  Volume2, 
  Printer, 
  TestTube,
  Layers,
  CircuitBoard
} from 'lucide-react'

const disciplines = [
  {
    icon: Settings,
    title: 'Mechanical Systems',
    description: 'Design and analysis of complex mechanical systems, including power transmission, motion control, and system integration.',
    skills: ['System Design', 'Power Transmission', 'Motion Control', 'Integration']
  },
  {
    icon: Wrench,
    title: 'Mechanism Design',
    description: 'Development of linkages, cams, gears, and other mechanical elements for precise motion control and force transmission.',
    skills: ['Linkages', 'Cams & Gears', 'Actuation', 'Force Analysis']
  },
  {
    icon: Layers,
    title: 'Tolerance & FEA',
    description: 'Finite element analysis, tolerance stack-up analysis, and stress analysis for robust design validation.',
    skills: ['FEA', 'Tolerance Analysis', 'Stress Analysis', 'Validation']
  },
  {
    icon: CircuitBoard,
    title: 'Materials & Manufacturing',
    description: 'Expertise in plastics, metals, PCBs, and flexible printed circuits with focus on design for manufacturing.',
    skills: ['Plastics', 'Metals', 'PCBs', 'FPC', 'DFM']
  },
  {
    icon: Volume2,
    title: 'Acoustics',
    description: 'Sound design, noise reduction, and acoustic optimization for consumer and industrial applications.',
    skills: ['Sound Design', 'Noise Reduction', 'Acoustic Modeling', 'Testing']
  },
  {
    icon: Printer,
    title: 'Rapid Prototyping',
    description: '3D printing, machining, and rapid prototyping techniques for iterative design and validation.',
    skills: ['3D Printing', 'Machining', 'CNC', 'Rapid Iteration']
  },
  {
    icon: TestTube,
    title: 'Testing & Validation',
    description: 'Design of experiments, test fixtures, and validation protocols for product reliability and performance.',
    skills: ['DOE', 'Test Fixtures', 'Validation', 'Reliability']
  },
  {
    icon: Cpu,
    title: 'Mechatronics',
    description: 'Integration of mechanical systems with electronics, sensors, and control systems for smart products.',
    skills: ['Sensors', 'Control Systems', 'Integration', 'Smart Products']
  }
]

export default function DisciplinePage() {
  return (
    <div className="min-h-screen bg-[#f7f6f3] pt-24 pb-20 md:pt-28 md:pb-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <h1 className="text-[30px] leading-tight sm:text-[34px] md:text-[40px] lg:text-[44px] font-bold tracking-tight text-[#0b0d12]">
            Discipline
          </h1>
          <p className="mt-3 text-[12px] md:text-[13px] font-medium uppercase tracking-[0.12em] text-[#4b5563] leading-snug">
            Comprehensive expertise across mechanical engineering disciplines, from concept to production.
          </p>
          <div className="mt-4 w-12 border-t border-[#e0ddd8]" aria-hidden />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {disciplines.map((discipline) => (
            <div
              key={discipline.title}
              className="bg-white border border-[#e0ddd8] rounded-lg p-8"
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-[#166534]/10 rounded-lg flex items-center justify-center">
                    <discipline.icon className="w-6 h-6 text-[#166534]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0b0d12]">{discipline.title}</h3>
                </div>
                <p className="text-[#374151] leading-[1.7]">
                  {discipline.description}
                </p>
                <div className="space-y-3">
                  <h4 className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#4b5563]">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {discipline.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs font-medium rounded border border-[#166534]/30 text-[#166534]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-[#e0ddd8]">
          <h2 className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#166534] mb-6">Design Philosophy</h2>
          <p className="text-[#374151] leading-[1.7] max-w-3xl">
            I approach mechanical design with a focus on manufacturability, reliability, and user experience. 
            Every mechanism should be elegant in its simplicity, robust in its construction, and intuitive in its operation. 
            My experience spans from rapid prototyping to production optimization, ensuring designs that not only work 
            but can be efficiently manufactured at scale.
          </p>
        </div>
      </div>
    </div>
  )
}

