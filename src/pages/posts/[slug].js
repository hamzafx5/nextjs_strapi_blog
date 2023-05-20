import React from "react";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import client from "../../../apollo-client";
import { gql } from "@apollo/client";
import getBaseURL from "@/helpers/getBaseURL";
import ReactMarkdown from "react-markdown";
import {
    TwitterShareButton,
    EmailShareButton,
    FacebookShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    EmailIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from "react-share";
import { useRouter } from "next/router";

export async function getStaticPaths() {
    const {
        data: { posts },
    } = await client.query({
        query: gql`
            query {
                posts(pagination: { limit: 1000 }) {
                    data {
                        attributes {
                            slug
                        }
                    }
                }
            }
        `,
    });
    let paths = posts.data.map((post) => ({
        params: {
            slug: post.attributes.slug,
        },
    }));
    return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params: { slug } }) {
    const { data } = await client.query({
        query: gql`
            query Posts($slug: String!) {
                posts(filters: { slug: { eq: $slug } }, pagination: { limit: 1 }) {
                    data {
                        id
                        attributes {
                            slug
                            title
                            publishedAt
                            body
                            cover {
                                data {
                                    attributes {
                                        url
                                        alternativeText
                                    }
                                }
                            }
                            category {
                                data {
                                    attributes {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `,
        variables: { slug },
    });
    return {
        props: {
            post: data.posts.data[0],
        },
        revalidate: 120,
    };
}

export default function BlogPost({ post }) {
    const router = useRouter();
    if (router.isFallback) {
        return (
            <p className="text-center bg-orange-100 text-orange-600 border border-orange-200 rounded px-4 py-1 w-max block mx-auto my-10">
                Loading...
            </p>
        );
    }
    if (!post) return <p>Not found 404</p>;
    let coverURL = post?.attributes.cover.data.attributes.url || null;
    let coverAlt = post?.attributes.cover.data.attributes.alternativeText || undefined;
    let postURL = getBaseURL(`/posts/${post?.attributes.slug}`);
    return (
        <>
            <Nav />
            <main className="container max-w-3xl py-8" role="main">
                <article itemScope itemType="https://schema.org/Article">
                    <meta itemProp="mainEntityOfPage" content={postURL} />
                    <header>
                        <h1 itemProp="headline">{post.attributes.title}</h1>
                        <div className="text-sm text-gray-500 mb-3 flex gap-2 items-center">
                            Veröffentlicht:{" "}
                            {new Date(post.attributes.publishedAt).toLocaleDateString()}
                            <span className="w-1 h-1 rounded-md bg-gray-600 inline-block" />
                            Kategorie: {post.attributes.category.data.attributes.name}
                        </div>
                        {coverURL && (
                            <figure className="block border rounded-xl bg-gray-50 mb-8 aspect-video relative overflow-hidden">
                                <Image
                                    priority
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    fill
                                    src={coverURL}
                                    alt={coverAlt}
                                />
                            </figure>
                        )}
                    </header>

                    <div itemProp="articleBody" className="article-body">
                        {/* eslint-disable-next-line */}
                        <ReactMarkdown children={post.attributes.body} />
                    </div>
                </article>
                <ShareOnSocialMedia url={postURL} />
            </main>
            <Footer />
        </>
    );
}

function ShareOnSocialMedia({ url, round = false }) {
    return (
        <div>
            <p className="font-medium mb-3 block">Aktie</p>
            <div className="flex gap-3">
                <FacebookShareButton url={url}>
                    <FacebookIcon size={32} round={round} />
                </FacebookShareButton>
                <TwitterShareButton url={url}>
                    <TwitterIcon size={32} round={round} />
                </TwitterShareButton>
                <LinkedinShareButton url={url}>
                    <LinkedinIcon size={32} round={round} />
                </LinkedinShareButton>
                <WhatsappShareButton url={url}>
                    <WhatsappIcon size={32} round={round} />
                </WhatsappShareButton>
                <EmailShareButton url={url}>
                    <EmailIcon size={32} round={round} />
                </EmailShareButton>
            </div>
        </div>
    );
}
