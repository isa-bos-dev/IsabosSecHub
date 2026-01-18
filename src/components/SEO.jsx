import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, type = 'website', name = 'Isabos Security Hub' }) => {
    return (
        <Helmet>
            {/* Estándar */}
            <title>{title} | {name}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property='og:type' content={type} />
            <meta property='og:title' content={title} />
            <meta property='og:description' content={description} />
            {/* <meta property='og:image' content={image} /> */}
            {/* <meta property='og:url' content={url} /> */}

            {/* Twitter */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={title} />
            <meta name='twitter:description' content={description} />
            {/* <meta name='twitter:image' content={image} /> */}

            {/* Otros */}
            <link rel="canonical" href={window.location.href} />
        </Helmet>
    );
};

export default SEO;
