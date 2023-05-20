import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ArticlesSection({ posts }) {
    return (
        <div className="py-14 my-6">
            <h2 className="font-bold text-4xl mb-6 block">Artikel</h2>
            <div className="grid gap-y-10 lg:gap-y-12 gap-x-5 md:grid-cols-2 lg:grid-cols-3">
                {(posts?.data || []).map((post) => {
                    return <BlogPostCard key={post.id} {...post.attributes} />;
                })}
            </div>
        </div>
    );
}

function BlogPostCard({ title, description, slug, cover, publishedAt, category }) {
    let url = cover?.data?.attributes?.url || null;
    let alt = cover?.data?.attributes?.alternativeText || "";
    let categoryName = category?.data?.attributes?.name || null;
    let postURL = `/posts/${slug}`;
    return (
        <div>
            <Link
                href={postURL}
                className="block border rounded-xl bg-gray-50 mb-5 aspect-video relative overflow-hidden hover:scale-[1.01] transition-transform duration-200"
            >
                {categoryName && (
                    <div className="absolute z-10 top-4 right-4 bg-white text-black font-semibold uppercase text-[12px] py-1.5 px-3 shadow-sm shadow-black/20 rounded-[30px] leading-none cursor-context-menu">
                        {categoryName}
                    </div>
                )}
                {url && (
                    <Image
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                        }}
                        fill
                        alt={alt}
                        src={url}
                    />
                )}
            </Link>
            <div className="text-sm text-gray-500 mb-3">
                Veröffentlicht: {new Date(publishedAt).toLocaleDateString()}
            </div>
            <div className="flex flex-col gap-3">
                <h3 className="font-bold text-2xl tracking-tight leading-7 hover:underline">
                    <Link href={postURL}>{title}</Link>
                </h3>
                <p className="text-sm font-medium text-gray-600 tracking-tight">{description}</p>
            </div>
        </div>
    );
}
