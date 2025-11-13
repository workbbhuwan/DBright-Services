/**
 * Translation keys and types for the Dbright Services website
 * Supports Japanese (ja) and English (en)
 */

export type Language = 'ja' | 'en';

export interface Translations {
    nav: {
        home: string;
        services: string;
        companyProfile: string;
        contact: string;
    };
    home: {
        hero: {
            title: string;
            tagline: string;
            ctaServices: string;
            ctaContact: string;
        };
        intro: {
            title: string;
            description: string;
        };
        whyChooseUs: {
            title: string;
            reasons: {
                quality: {
                    title: string;
                    description: string;
                };
                trust: {
                    title: string;
                    description: string;
                };
                speed: {
                    title: string;
                    description: string;
                };
                cleanliness: {
                    title: string;
                    description: string;
                };
            };
        };
    };
    services: {
        title: string;
        subtitle: string;
        list: {
            home: {
                title: string;
                description: string;
            };
            office: {
                title: string;
                description: string;
            };
            hotel: {
                title: string;
                description: string;
            };
            airbnb: {
                title: string;
                description: string;
            };
            deep: {
                title: string;
                description: string;
            };
            regular: {
                title: string;
                description: string;
            };
        };
    };
    companyProfile: {
        title: string;
        subtitle: string;
        description: string;
        mission: {
            title: string;
            description: string;
        };
        values: {
            title: string;
            quality: {
                title: string;
                description: string;
            };
            trust: {
                title: string;
                description: string;
            };
            cleanliness: {
                title: string;
                description: string;
            };
            professionalism: {
                title: string;
                description: string;
            };
        };
    };
    contact: {
        title: string;
        subtitle: string;
        form: {
            name: string;
            email: string;
            phone: string;
            message: string;
            submit: string;
            sending: string;
        };
        success: string;
        error: string;
    };
    footer: {
        company: string;
        address: string;
        phone: string;
        email: string;
        copyright: string;
    };
}
