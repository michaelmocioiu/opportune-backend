const Company = require("../../model/Company");

const companyResolvers = {
  // Get a company by its ID
  getById: async (parent, { companyId }) => {
    const company = await Company.findById(companyId);
    if (!company) {
      throw new Error("Company not found!");
    }
    return company;
  },

  // Create a new company
  create: async (parent, args) => {
    const { 
      name, website, industry, address, city, country, 
      description, business_registry_id, CRA_BN, managers, recruiters
    } = args;

    const newCompany = new Company({
      name, website, industry, address, city, country,
      description, business_registry_id, CRA_BN, managers, recruiters
    });

    await newCompany.save();
    return newCompany;
  },

  // Update an existing company
  update: async (parent, { id, ...args }) => {
    const company = await Company.findByIdAndUpdate(id, args, { new: true });
    if (!company) {
      throw new Error("Company not found!");
    }
    return company;
  },
};

module.exports = companyResolvers;
