import { describe, expect, it } from 'vitest'
import { blogCategories, blogPosts } from './blogPosts'
import { processSteps } from './processSteps'
import { projects } from './projects'
import { serviceDetails } from './serviceDetails'
import { services } from './services'
import { stats } from './stats'
import { team } from './team'
import { testimonials } from './testimonials'

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/

function uniqueValues(items, key) {
  return new Set(items.map((item) => item[key]))
}

describe('services', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(services)).toBe(true)
    expect(services.length).toBeGreaterThan(0)
  })

  it('has unique ids', () => {
    expect(uniqueValues(services, 'id').size).toBe(services.length)
  })

  it('every service has the required fields populated', () => {
    for (const service of services) {
      expect(typeof service.id).toBe('string')
      expect(service.id.length).toBeGreaterThan(0)
      expect(typeof service.title).toBe('string')
      expect(typeof service.tagline).toBe('string')
      expect(typeof service.description).toBe('string')
      expect(Array.isArray(service.features)).toBe(true)
      expect(service.features.length).toBeGreaterThan(0)
      expect(typeof service.icon).toBe('string')
    }
  })

  it('uses valid hex accent colors', () => {
    for (const service of services) {
      expect(service.accent).toMatch(HEX_COLOR)
    }
  })

  it('defines a three-stage sequence for every service', () => {
    for (const service of services) {
      expect(Array.isArray(service.sequence)).toBe(true)
      expect(service.sequence).toHaveLength(3)
    }
  })
})

describe('serviceDetails', () => {
  it('has an entry for every service id', () => {
    for (const service of services) {
      expect(serviceDetails).toHaveProperty(service.id)
    }
  })

  it('has no detail entries that lack a matching service', () => {
    const ids = uniqueValues(services, 'id')
    for (const key of Object.keys(serviceDetails)) {
      expect(ids.has(key)).toBe(true)
    }
  })

  it('every detail has overview, capabilities, faq and techStack', () => {
    for (const detail of Object.values(serviceDetails)) {
      expect(Array.isArray(detail.overview)).toBe(true)
      expect(detail.overview.length).toBeGreaterThan(0)
      expect(Array.isArray(detail.capabilities)).toBe(true)
      expect(detail.capabilities.length).toBeGreaterThan(0)
      expect(Array.isArray(detail.faq)).toBe(true)
      expect(Array.isArray(detail.techStack)).toBe(true)
    }
  })

  it('faq entries always have both a question and an answer', () => {
    for (const detail of Object.values(serviceDetails)) {
      for (const entry of detail.faq) {
        expect(entry.question.length).toBeGreaterThan(0)
        expect(entry.answer.length).toBeGreaterThan(0)
      }
    }
  })

  it('capabilities always have icon, title and description', () => {
    for (const detail of Object.values(serviceDetails)) {
      for (const capability of detail.capabilities) {
        expect(typeof capability.icon).toBe('string')
        expect(typeof capability.title).toBe('string')
        expect(typeof capability.description).toBe('string')
      }
    }
  })
})

describe('processSteps', () => {
  it('has unique ids and sequential two-digit step numbers', () => {
    expect(uniqueValues(processSteps, 'id').size).toBe(processSteps.length)
    processSteps.forEach((step, index) => {
      expect(step.step).toBe(String(index + 1).padStart(2, '0'))
    })
  })

  it('every step has a title, description and deliverables', () => {
    for (const step of processSteps) {
      expect(step.title.length).toBeGreaterThan(0)
      expect(step.description.length).toBeGreaterThan(0)
      expect(Array.isArray(step.deliverables)).toBe(true)
      expect(step.deliverables.length).toBeGreaterThan(0)
    }
  })
})

describe('projects', () => {
  it('has unique ids', () => {
    expect(uniqueValues(projects, 'id').size).toBe(projects.length)
  })

  it('every project has a title, category and tech list', () => {
    for (const project of projects) {
      expect(typeof project.id).toBe('string')
      expect(typeof project.title).toBe('string')
      expect(typeof project.category).toBe('string')
      expect(Array.isArray(project.tech)).toBe(true)
      expect(project.tech.length).toBeGreaterThan(0)
    }
  })
})

describe('blogPosts', () => {
  it('has unique slugs', () => {
    expect(uniqueValues(blogPosts, 'slug').size).toBe(blogPosts.length)
  })

  it('every post category is present in blogCategories', () => {
    for (const post of blogPosts) {
      expect(blogCategories).toContain(post.category)
    }
  })

  it('blogCategories starts with the "All" filter', () => {
    expect(blogCategories[0]).toBe('All')
  })

  it('every post has content blocks with a recognised type', () => {
    for (const post of blogPosts) {
      expect(Array.isArray(post.content)).toBe(true)
      expect(post.content.length).toBeGreaterThan(0)
      for (const block of post.content) {
        expect(['paragraph', 'heading']).toContain(block.type)
        expect(typeof block.text).toBe('string')
      }
    }
  })
})

describe('stats', () => {
  it('has unique ids and numeric values', () => {
    expect(uniqueValues(stats, 'id').size).toBe(stats.length)
    for (const stat of stats) {
      expect(typeof stat.value).toBe('number')
      expect(typeof stat.label).toBe('string')
    }
  })
})

describe('team', () => {
  it('has unique ids and required member fields', () => {
    expect(uniqueValues(team, 'id').size).toBe(team.length)
    for (const member of team) {
      expect(typeof member.name).toBe('string')
      expect(typeof member.role).toBe('string')
      expect(Array.isArray(member.specializations)).toBe(true)
    }
  })
})

describe('testimonials', () => {
  it('has unique ids', () => {
    expect(uniqueValues(testimonials, 'id').size).toBe(testimonials.length)
  })

  it('ratings are integers between 1 and 5', () => {
    for (const testimonial of testimonials) {
      expect(Number.isInteger(testimonial.rating)).toBe(true)
      expect(testimonial.rating).toBeGreaterThanOrEqual(1)
      expect(testimonial.rating).toBeLessThanOrEqual(5)
    }
  })

  it('every testimonial has a quote, name and company', () => {
    for (const testimonial of testimonials) {
      expect(testimonial.quote.length).toBeGreaterThan(0)
      expect(testimonial.name.length).toBeGreaterThan(0)
      expect(testimonial.company.length).toBeGreaterThan(0)
    }
  })
})
