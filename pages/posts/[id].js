import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostsData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'


export default function Post({ postData: { id, title, date, contentHTML } }) {
	return <Layout>
		<Head>
			<title>{title}</title>
		</Head>
		<article>
			<h1 className={utilStyles.headingXL}>{title}</h1>
			<div className={utilStyles.lightText}>
				<Date dateString={date}/>
			</div>
			<div dangerouslySetInnerHTML={{ __html: contentHTML }}></div>
		</article>
	</Layout>;
}

export async function getStaticPaths() {
	const paths = getAllPostIds();

	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	const postData = await getPostsData(params.id);

	return {
		props: { postData }
	}
}