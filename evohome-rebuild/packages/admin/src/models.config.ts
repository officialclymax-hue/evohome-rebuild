export type Field = { name:string; label:string; type:'text'|'textarea'|'json'|'boolean'|'date'|'image'|'richtext'; required?:boolean; };
export const MODELS = {
  services: {
    title: 'Services', endpoint: '/services', id: 'id', columns: ['name','slug','category','featured'],
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'longDescription', label: 'Long Description', type: 'richtext' },
      { name: 'benefits', label: 'Benefits', type: 'json' },
      { name: 'image', label: 'Image URL', type: 'text' },
      { name: 'featured', label: 'Featured', type: 'boolean' },
      { name: 'averageSavings', label: 'Average Savings', type: 'text' },
      { name: 'installTime', label: 'Install Time', type: 'text' },
      { name: 'warranty', label: 'Warranty', type: 'text' },
      { name: 'whatIsIt', label: 'What Is It?', type: 'textarea' },
      { name: 'howItWorksSteps', label: 'How It Works Steps', type: 'json' },
      { name: 'comparisonTable', label: 'Comparison Table', type: 'json' },
      { name: 'whyChooseContent', label: 'Why Choose', type: 'textarea' },
      { name: 'howEvoHomeHelps', label: 'How EvoHome Helps', type: 'textarea' },
      { name: 'relatedArticles', label: 'Related Articles', type: 'json' },
      { name: 'externalResources', label: 'External Resources', type: 'json' },
      { name: 'faqs', label: 'FAQs', type: 'json' },
      { name: 'serviceTypes', label: 'Service Types', type: 'json' },
      { name: 'materials', label: 'Materials', type: 'json' }
    ]
  },
  counties: { title:'Counties', endpoint:'/counties', id:'id', columns:['name','slug','isPrimary'],
    fields:[
      { name:'name', label:'Name', type:'text', required:true },
      { name:'slug', label:'Slug', type:'text', required:true },
      { name:'description', label:'Description', type:'textarea' },
      { name:'isPrimary', label:'Primary', type:'boolean' }
    ]
  },
  blog: { title:'Blog Posts', endpoint:'/blog', id:'id', columns:['title','slug','date','author'],
    fields:[
      { name:'title', label:'Title', type:'text', required:true },
      { name:'slug', label:'Slug', type:'text', required:true },
      { name:'excerpt', label:'Excerpt', type:'textarea' },
      { name:'content', label:'Content', type:'richtext' },
      { name:'date', label:'Date', type:'date' },
      { name:'author', label:'Author', type:'text' },
      { name:'category', label:'Category', type:'text' },
      { name:'image', label:'Image URL', type:'text' }
    ]
  },
  gallery: { title:'Gallery', endpoint:'/gallery', id:'id', columns:['title','category','src'],
    fields:[
      { name:'title', label:'Title', type:'text' },
      { name:'category', label:'Category', type:'text' },
      { name:'src', label:'Image URL', type:'text', required:true },
      { name:'alt', label:'Alt', type:'text' }
    ]
  },
  testimonials: { title:'Testimonials', endpoint:'/testimonials', id:'id', columns:['name','rating','service','location'],
    fields:[
      { name:'name', label:'Name', type:'text', required:true },
      { name:'text', label:'Text', type:'textarea', required:true },
      { name:'rating', label:'Rating', type:'text' },
      { name:'service', label:'Service', type:'text' },
      { name:'location', label:'Location', type:'text' },
      { name:'verified', label:'Verified', type:'boolean' },
      { name:'savings', label:'Savings', type:'text' },
      { name:'date', label:'Date', type:'date' }
    ]
  },
  company: { title:'Company Info', endpoint:'/company-info', id:'id', columns:['name','phone','email'],
    fields:[
      { name:'name', label:'Name', type:'text', required:true },
      { name:'email', label:'Email', type:'text' },
      { name:'phone', label:'Phone', type:'text' },
      { name:'address', label:'Address (JSON)', type:'json' },
      { name:'openingHours', label:'Opening Hours (JSON)', type:'json' },
      { name:'socialLinks', label:'Social Links (JSON)', type:'json' },
      { name:'areaServed', label:'Area Served (array)', type:'json' },
      { name:'jsonLd', label:'JSON-LD (JSON)', type:'json' }
    ]
  },
  leads: { title:'Leads', endpoint:'/form-submissions', id:'id', columns:['createdAt','name','service','postcode'], fields:[] }
} as const;
