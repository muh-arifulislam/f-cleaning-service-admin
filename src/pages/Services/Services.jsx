import React from "react";

// components
import CardService from "../../components/Cards/CardService";

const Services = () => {
  return (
    <div>
      <div className="grid lg:md:grid-cols-2 grid-cols-1 gap-8">
        <div className="relative">
          <CardService service={{}} />
          {/* <ServiceCardDropdown /> */}
        </div>
        <div className="relative">
          <CardService service={{}} />
          {/* <ServiceCardDropdown /> */}
        </div>
        <div className="relative">
          <CardService service={{}} />
          {/* <ServiceCardDropdown /> */}
        </div>
        <div className="relative">
          <CardService service={{}} />
          {/* <ServiceCardDropdown /> */}
        </div>
      </div>
    </div>
  );
};

export default Services;
