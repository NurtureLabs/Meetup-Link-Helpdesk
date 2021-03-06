// import { NotionRenderer, BlockMapType } from "react-notion";
import Head from "next/head";
import Link from "next/link";
import fetch from "node-fetch";
// import { NotionPage } from "[pageId]";
import React from 'react'
// import Head from 'next/head'

import { getPageTitle, getAllPagesInSpace } from 'notion-utils'
import { NotionAPI } from 'notion-client'
import { NotionRenderer } from 'react-notion-x'

const notion = new NotionAPI()

export const getStaticProps = async (context) => {
  const pageId = 'de32633efcbe448e964651a9ea50c3fa'
  const recordMap = await notion.getPage(pageId)

  return {
    props: {
      recordMap
    },
    revalidate: 10
  }
}

// export async function getStaticPaths() {
//   const rootNotionPageId = 'de32633efcbe448e964651a9ea50c3fa'
//   const rootNotionSpaceId = '01ec9c00-d04b-4c88-b572-07db20e663c9'

//   // This crawls all public pages starting from the given root page in order
//   // for next.js to pre-generate all pages via static site generation (SSG).
//   // This is a useful optimization but not necessary; you could just as easily
//   // set paths to an empty array to not pre-generate any pages at build time.
//   const pages = await getAllPagesInSpace(
//     rootNotionPageId,
//     rootNotionSpaceId,
//     notion.getPage.bind(notion)
//   )

//   const paths = Object.keys(pages).map((pageId) => `/${pageId}`)
//   // const paths = Object.keys(pages).map((pageId) => `/`)


//   return {
//     paths,
//     fallback: true
//   }
// }

// const Home = ({ blockMap }) => (
//     <NotionPage
//     />
// );

// export default Home;

// const Home = ({ blockMap }) => (
//   <div>
//     <Head>
//       <style>{`body { margin: 0;}`}</style>
//       <title>react-notion example</title>
//     </Head>
//     <NotionRenderer
//       blockMap={blockMap}
//       fullPage
//       hideHeader
//       customBlockComponents={{
//         page: ({ blockValue, renderComponent }) => (
//           <Link href={`/${blockValue.id}`}>{renderComponent()}</Link>
//         )
//       }}
//     />
//   </div>
// );

export default function Home({ recordMap }) {
  if (!recordMap) {
    return null
  }

  const title = getPageTitle(recordMap)
  console.log(title, recordMap)

  return (
    <>
      <Head>
        <meta name='description' content='React Notion X demo renderer.' />
        <title>{title}</title>
      </Head>

      <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
    </>
  )
}
