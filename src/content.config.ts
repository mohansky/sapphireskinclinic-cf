import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const siteCollection = defineCollection({
  loader: file("src/content/site/index.yml"),
  schema: () =>
    z.object({
      name: z.string(),
      tagline: z.string(),
      title: z.string(),
      description: z.string(),
      basepath: z.string(),
      ogImageURL: z.string(),
      keywords: z.array(z.string()),
      author: z.object({
        name: z.string(),
        email: z.string().email(),
        url: z.string().url(),
      }),
      hero: z.array(
        z.object({
          title: z.string(),
          subtitle: z.string().optional(),
          isFirstSlide: z.boolean().optional().default(false),
          backgroundImage: z.string(),
          overlayOpacity: z.number().optional(),
          primaryButtonText: z.string().optional(),
          primaryButtonLink: z.string().optional(),
          secondaryButtonText: z.string().optional(),
          secondaryButtonLink: z.string().optional(),
        }),
      ),
      heroPage: z.array(
        z.object({
          title: z.string(),
          slug: z.string(),
          subtitle: z.string().optional(),
          img: z.string(),
          overlayOpacity: z.number().optional(),
        }),
      ),
      offers: z.array(
        z.object({
          title: z.string().optional().nullable(),
          subtitle: z.string().optional().nullable(),
          image: z.string(),
          offerImg: z.string(),
        }),
      ),
      about: z.object({
        description: z.string(),
        mission: z.string(),
        vision: z.string(),
      }),
      values: z.array(z.string()),
      aboutTitle: z.string(),
      aboutText: z.string(),
      aboutImage: z.string(),
      videosrc: z.string(),
      videoposter: z.string(),
      highlights: z.array(
        z.object({
          number: z.string(),
          title: z.string(),
          icon: z.string(),
        }),
      ),
      testimonials: z.array(
        z.object({
          number: z.string(),
          text: z.string(),
          patient: z.string(),
          rating: z.number(),
        }),
      ),
      footerBookAppointment: z.object({
        title: z.string(),
        btnLink: z.string(),
        btnText: z.string(),
      }),
      footerLatestOffers: z.object({
        title: z.string(),
        subtitle: z.string(),
        bgImage: z.string(),
        offerImg: z.string(),
        btnLink: z.string(),
        btnText: z.string(),
      }),
      popularTreatments: z.array(
        z.object({
          name: z.string(),
          link: z.string(),
        }),
      ),
      usefulLinks: z.array(
        z.object({
          name: z.string(),
          link: z.string(),
        }),
      ),
      socialsTitle: z.string(),
      social_media: z.array(
        z.object({
          link: z.string().url(),
          icon: z.string(),
          text: z.string(),
        }),
      ),
      copyright: z.object({
        year: z.number(),
        text: z.string(),
        footnote: z.string(),
      }),
      faq: z.array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      ),
      equipments: z.array(
        z.object({
          title: z.string(),
          image: z.string(),
          titleImage: z.string(),
          text: z.array(z.string()),
        }),
      ),
      locations: z.array(
        z.object({
          title: z.string(),
          address: z.array(z.string()),
          phones: z.array(z.string()),
          email: z.string().email(),
          map: z.string(),
          timmings: z.array(
            z.object({
              title: z.string(),
              details: z.string(),
            }),
          ),
        }),
      ),
      navigation: z.array(
        z.object({
          text: z.string(),
          link: z.string(),
          active: z.boolean().optional().default(false),
        }),
      ),
    }),
});

const aboutCollection = defineCollection({
  loader: file("src/content/about/index.yml"),
  schema: () =>
    z.object({
      name: z.string(),
      tagline: z.string(),
      aboutQuote: z.string(),
      aboutClinic: z.object({
        heading: z.string(),
        text: z.array(z.string()),
        images: z.array(z.string()),
      }),
      whyUs: z.object({
        heading: z.string(),
        list: z.array(z.object({ text: z.string(), icon: z.string() })),
      }),
      doctors: z.array(
        z.object({
          published: z.boolean().optional().default(true),
          name: z.string(),
          qualifications: z.string(),
          specialization: z.string(),
          image: z.string(),
          bio: z.string().optional(),
        }),
      ),
      teamTitle: z.string(),
      teamImage: z.string(),
    }),
});

const treatmentsCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/treatments" }),
  schema: () =>
    z.object({
      title: z.string(),
      permalink: z.string().optional(),
      draft: z.boolean().optional().default(false),
      type: z.string(),
      weight: z.number(),
      category: z.string(),
      description: z.string(),
      icon: z.string(),
      img: z.string(),
      before: z.string().optional().nullable(),
      after: z.string().optional().nullable(),
      procedureType: z
        .enum([
          "http://schema.org/NoninvasiveProcedure",
          "http://schema.org/PercutaneousProcedure",
        ])
        .default("http://schema.org/PercutaneousProcedure"),
      // SEO & Schema.org fields
      bodyLocation: z.string().optional(), // e.g., "Face", "Scalp", "Body"
      duration: z.string().optional(), // e.g., "30-45 minutes"
      recovery: z.string().optional(), // e.g., "1-2 days"
      sessions: z.string().optional(), // e.g., "3-6 sessions"
      results: z.string().optional(), // e.g., "6-12 months"
      preparationRequired: z.string().optional(), // Pre-treatment instructions
      followupRequired: z.string().optional(), // Aftercare instructions
      suitableFor: z.array(z.string()).optional(), // Ideal candidates
      contraindications: z.array(z.string()).optional(), // Who shouldn't have this
      faq: z
        .array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        )
        .optional(),
    }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: () =>
    z.object({
      title: z.string(),
      permalink: z.string().optional(),
      draft: z.boolean().optional().default(false),
      type: z.string(),
      publishDate: z.date(),
      author: z.string(),
      category: z.string(),
      description: z.string(),
      img: z.string(),
      tags: z.array(z.string()).optional(),
    }),
});

const galleryCollection = defineCollection({
  loader: glob({ pattern: "**/*.yml", base: "./src/content/gallery" }),
  schema: () =>
    z.object({
      folder: z.string(),
      title: z.string(),
      images: z.array(
        z.object({
          src: z.string(),
          title: z.string(),
          width: z.number().optional().default(1200),
          height: z.number().optional().default(800),
        }),
      ),
    }),
});

export const collections = {
  siteCollection: siteCollection,
  treatments: treatmentsCollection,
  aboutCollection: aboutCollection,
  blog: blogCollection,
  gallery: galleryCollection,
};
