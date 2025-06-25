/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://neuroderma.vercel.app',
  generateRobotsTxt: true,

  additionalPaths: async (config) => {
    const paths = [];

    // Halaman statis
    paths.push({
      loc: '/',
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    });
    paths.push({
      loc: '/tentang-kami',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    });
    paths.push({
      loc: '/faq',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    });

    const slugs = ['monkeypox', 'chickenpox', 'measles'];
    slugs.forEach((slug) => {
      paths.push({
        loc: `/info/${slug}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });

    return paths;
  },
};
