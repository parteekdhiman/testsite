import { partners } from "../data/partners";

const PartnersSection = () => {
  return (
    <section id="partners" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our Business{" "}
            <span className="gradient-text">Partners</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're proud to collaborate with industry-leading companies that share our commitment to excellence and innovation.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-2xl p-6 flex items-center justify-center hover:scale-105 transition-all duration-300"
            >
              <img
                src={partner.img}
                alt={partner.name}
                className="max-h-12 w-auto object-contain filter brightness-75 group-hover:brightness-100 transition-all duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
