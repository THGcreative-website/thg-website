import { client } from '../../lib/sanity'

export default async function ProjectsPage() {
  const projects = await client.fetch(`*[_type == "project"]{
    _id,
    title,
    client,
    location,
    "slug": slug.current,
  }`)

  return (
    <main style={{ padding: '100px 72px 0' }}>
      <h1 style={{ marginBottom: '40px' }}>Projects</h1>
      {projects.map((project) => (
        <div key={project._id} style={{ marginBottom: '24px' }}>
          <a href={`/projects/${project.slug}`} style={{
            color: 'var(--orange)',
            textDecoration: 'none',
            fontSize: '20px',
            fontWeight: 600,
          }}>
            {project.title}
          </a>
          <p style={{ color: 'var(--mid-gray)' }}>{project.client} — {project.location}</p>
        </div>
      ))}
    </main>
  )
}