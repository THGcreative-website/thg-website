import { client } from '../../lib/sanity'
import ProjectBands from '../../components/ProjectBands'

export default async function ProjectsPage() {
  const projects = await client.fetch(`*[_type == "project"] | order(_createdAt asc){
    _id,
    title,
    location,
    industry,
    "slug": slug.current,
    "thumbnailUrl": heroImage.asset->url,
  }`)

  return <ProjectBands projects={projects} />
}