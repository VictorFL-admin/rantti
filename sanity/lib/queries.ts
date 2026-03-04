import { client } from './client'
import type { HomePageData } from './types'

export async function getHomePageData(): Promise<HomePageData | null> {
  try {
    const query = `*[_type == "homePage"][0]`
    const data = await client.fetch<HomePageData>(query, {}, {
      next: { revalidate: 60 } // Revalidar cada 60 segundos
    })
    return data
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return null
  }
}
