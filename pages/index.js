/**
 * HOME PAGE (index.js)
 * 
 * Purpose: This is the main landing page of the blog application. It displays a list of all
 * blog posts fetched from a WordPress REST API endpoint. The page uses Incremental Static 
 * Regeneration (ISR) to automatically refresh content every 60 seconds without requiring
 * a full rebuild/redeploy.
 * 
 * Key Features:
 * - Fetches blog post data from WordPress REST API at build time
 * - Displays posts in a sorted list with titles and dates
 * - Uses ISR to keep content fresh (revalidates every 60 seconds)
 * - Includes embedded YouTube video
 * - Responsive layout with custom styling
 */

// Import the Link component from Next.js for client-side navigation between pages
import Link from 'next/link';

// Import the custom Date component for formatting and displaying post dates
import Date from '../components/date';

// Import the Head component from Next.js for managing document head elements (title, meta tags)
import Head from 'next/head';

// Import the Layout component and siteTitle constant from the layout component
import Layout, { siteTitle } from '../components/layout';

// Import CSS module styles for utility classes (typography, spacing, etc.)
import utilStyles from '../styles/utils.module.css';

// Import the getSortedPostsData function to fetch and sort blog post data from WordPress API
import { getSortedPostsData } from '../lib/posts';
 
/**
 * getStaticProps - Static Site Generation (SSG) with Incremental Static Regeneration (ISR)
 * 
 * This function runs at build time on the server to fetch data for the page.
 * With ISR enabled (revalidate: 60), Next.js will:
 * 1. Serve the cached static page for fast performance
 * 2. After 60 seconds, regenerate the page in the background with fresh WordPress data
 * 3. Serve the updated page to subsequent visitors
 * 
 * @returns {object} Props containing all blog posts data and revalidation time
 */
export async function getStaticProps() {
  // Call the function to get all blog posts sorted by date from WordPress REST API
  const allPostsData = await getSortedPostsData();
  
  // Return the data as props to be passed to the Home component
  return {
    props: {
      allPostsData, // Array of post objects with id, title, and date
    },
    revalidate: 60, // Regenerate page with fresh WordPress data every 60 seconds (ISR)
  };
}

/**
 * Home - The main home page component
 * 
 * This component renders the home page layout including a YouTube video embed
 * and a list of all blog posts. Each post is displayed as a link with its
 * publication date.
 * 
 * @param {object} props - Component props
 * @param {Array} props.allPostsData - Array of blog post objects from getStaticProps
 * @returns {JSX.Element} The rendered home page
 */
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      {/* Set the page title in the document head */}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      {/* Main content section with centered styling */}
      <section className={utilStyles.centeredContent}>
        {/* Link to a special first post page */}
        <p><Link href="/posts/first-post">[DUMB DUMB DUMB DUMB DUMB]</Link></p>
        
        {/* Embedded YouTube video player */}
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/621LzO0qWnU" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
          style={{ marginBottom: '10px' }}
        />
      </section>

      {/* Blog posts section - displays all posts from WordPress */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        
        {/* Unordered list of all blog posts */}
        <ul className={utilStyles.list}>
          {/* Map through each post and render a list item with link and date */}
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {/* Link to individual post page using dynamic routing */}
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              {/* Display formatted publication date */}
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}