'use client'

import { 
  GraduationCap, 
  Award, 
  MapPin, 
  Calendar,
  Code,
  Wrench,
  Zap,
  Users,
  Target,
  Lightbulb
} from 'lucide-react'

const education: Array<{
  institution: string
  degree: string
  year: string
  icon: typeof GraduationCap
  specialization?: string
  gpa?: string
}> = [
  {
    institution: 'University of Pennsylvania',
    degree: 'MSE Robotics',
    year: '2025-2027',
    icon: Award,
  },
  {
    institution: 'University of California, San Diego',
    degree: 'B.S. Mechanical Engineering',
    specialization: 'Specialization in Robotics and Controls',
    year: '2021-2025',
    icon: GraduationCap,
  },
]

const skills = [
  { category: 'CAD & Design', items: ['Fusion 360', 'SolidWorks', 'AutoCAD', 'Rhino 7', 'ANSYS'] },
  { category: 'Prototyping & Fabrication', items: ['3D Printing', 'CNC Machining', 'Laser Cutting', 'Shop Tools'] },
  { category: 'Materials & Manufacturing', items: ['ABS', 'Metals', 'Composites', 'Woodworking'] },
  { category: 'Programming & Robotics', items: ['Python', 'MATLAB'] }
]

const values = [
  {
    icon: Lightbulb,
    title: 'Iteration',
    description: 'Rapid prototyping and iterative design lead to stronger solutions and faster progress.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Great products come from working across disciplines and combining diverse perspectives.'
  },
  {
    icon: Zap,
    title: 'Curiosity',
    description: 'A drive to explore new tools, techniques, and ideas keeps my work innovative and evolving.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7f6f3] pt-24 pb-20 md:pt-28 md:pb-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <header className="mb-14">
          <h1 className="text-[30px] leading-tight sm:text-[34px] md:text-[40px] lg:text-[44px] font-bold tracking-tight text-[#0b0d12]">
            About
          </h1>
          <p className="mt-3 text-[12px] md:text-[13px] font-medium uppercase tracking-[0.12em] text-[#4b5563] leading-snug">
            Mechanical engineering + robotics background. I like constraints: tight envelopes, tough materials, real users.
          </p>
          <div className="mt-4 w-12 border-t border-[#e0ddd8]" aria-hidden />
        </header>

        {/* Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Photo */}
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#f0eeeb] border border-[#e0ddd8]">
              <div className="w-full h-full flex items-center justify-center text-[#4b5563]">
                <div className="text-center">
                  <div className="w-24 h-24 bg-[#166534]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-[#166534]">SL</span>
                  </div>
                  <p className="text-sm">Photo placeholder</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Content */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#0b0d12]">Hi, I'm Sohan</h2>
            <div className="space-y-4 text-[#374151] leading-[1.7]">
              <p>
                I design and build hardware that bridges concept and reality. With a foundation in mechanical engineering and robotics, I specialize in taking ideas from sketch to manufacturable prototype with clean CAD, practical DFM, and fast iteration.
              </p>
              <p>
                I'm driven to create products that aren't just functional, but reliable, scalable, and intuitive. My work blends engineering rigor with a focus on human use, so the designs I create don't just work in theory—they succeed in the real world.
              </p>
              <p>
                Currently pursuing my MSE in Robotics at Penn, I'm looking for opportunities in product design and mechanical engineering where thoughtful design meets real-world impact.
              </p>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-24">
          <h2 className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#166534] mb-8">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu) => (
              <div
                key={edu.institution}
                className="bg-white border border-[#e0ddd8] rounded-lg p-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#166534]/10 rounded-lg flex items-center justify-center">
                      <edu.icon className="w-6 h-6 text-[#166534]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#0b0d12]">{edu.institution}</h3>
                      <p className="text-[#4b5563]">{edu.year}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#0b0d12]">{edu.degree}</h4>
                    {edu.specialization && (
                      <p className="text-[#374151]">{edu.specialization}</p>
                    )}
                    {edu.gpa && (
                      <p className="text-[#374151]">GPA: {edu.gpa}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-24">
          <h2 className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#166534] mb-8">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.category}
                className="bg-white border border-[#e0ddd8] rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-[#0b0d12] mb-4">{skill.category}</h3>
                <div className="space-y-2">
                  {skill.items.map((item) => (
                    <div
                      key={item}
                      className="text-sm text-[#374151]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#166534] mb-8">Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-[#166534]/10 rounded-lg flex items-center justify-center mx-auto">
                  <value.icon className="w-8 h-8 text-[#166534]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0b0d12]">{value.title}</h3>
                <p className="text-[#374151] leading-[1.6]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="pt-12 border-t border-[#e0ddd8] text-center">
          <p className="text-[#374151] mb-6 max-w-xl mx-auto">
            I'm always interested in new opportunities and collaborations. 
            Let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#166534] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Get in Touch
            </a>
            <a
              href="/resume"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#e0ddd8] bg-white text-[#374151] rounded-lg hover:border-[#166534]/40 transition-colors font-medium"
            >
              View Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

