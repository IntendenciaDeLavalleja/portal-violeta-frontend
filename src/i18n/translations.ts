import type { Language } from '../stores/language';

type TranslationKeys = {
  // Navbar
  nav_home: string;
  nav_accommodations: string;
  nav_services: string;
  nav_reviews: string;
  nav_contact: string;
  nav_search_placeholder: string;
  nav_guide: string;
  hero_guide_cta: string;

  // Hero
  hero_title: string;
  hero_subtitle: string;
  hero_cta: string;
  hero_secondary_cta: string;

  // Accommodations
  acc_title: string;
  acc_subtitle: string;
  acc_cabins: string;
  acc_motorhome: string;
  acc_camping: string;
  acc_per_night: string;
  acc_available: string;
  acc_persons: string;
  acc_book_now: string;
  acc_view_all: string;
  acc_promo: string;
  acc_from: string;
  acc_amenities: string;
  acc_description: string;
  acc_close: string;
  acc_filters: string;
  acc_type: string;
  acc_price_range: string;
  acc_all_types: string;
  acc_sort_by: string;
  acc_sort_price_low: string;
  acc_sort_price_high: string;
  acc_results: string;
  acc_no_results: string;

  // Services
  svc_title: string;
  svc_subtitle: string;
  svc_pool_open: string;
  svc_pool_open_desc: string;
  svc_pool_covered: string;
  svc_pool_covered_desc: string;
  svc_playground: string;
  svc_playground_desc: string;
  svc_electricity: string;
  svc_electricity_desc: string;
  svc_parks: string;
  svc_parks_desc: string;
  svc_bbq: string;
  svc_bbq_desc: string;
  svc_wifi: string;
  svc_wifi_desc: string;
  svc_parking: string;
  svc_parking_desc: string;

  // Reviews
  rev_title: string;
  rev_subtitle: string;
  rev_total: string;

  // Suggestions
  sug_title: string;
  sug_subtitle: string;
  sug_name: string;
  sug_email: string;
  sug_confirm_email: string;
  sug_category: string;
  sug_cat_general: string;
  sug_cat_services: string;
  sug_cat_facilities: string;
  sug_cat_activities: string;
  sug_message: string;
  sug_submit: string;
  sug_success: string;

  // Footer
  footer_desc: string;
  footer_links: string;
  footer_contact: string;
  footer_rights: string;
  footer_managed: string;

  // Search
  search_title: string;
  search_results_for: string;

  // Reservations
  res_from: string;
  res_to: string;
  res_guests: string;
  res_submit: string;
  res_full_name: string;
  res_phone: string;
  res_email: string;
  res_confirm_email: string;
  res_notes: string;
  res_notes_placeholder: string;
  res_pay_arrival: string;

  // Sentí Lavalleja (Landing Page)
  sl_seo_title: string;
  sl_seo_desc: string;
  sl_hero_badge: string;
  sl_hero_title_1: string;
  sl_hero_title_2: string;
  sl_hero_tagline: string;
  sl_hero_p1: string;
  sl_hero_cta_book: string;
  sl_hero_cta_explore: string;
  sl_exp1_badge: string;
  sl_exp1_title: string;
  sl_exp1_p1: string;
  sl_exp1_p2: string;
  sl_exp1_li1: string;
  sl_exp1_li2: string;
  sl_exp1_li3: string;
  sl_exp1_li4: string;
  sl_exp1_cta: string;
  sl_exp2_badge: string;
  sl_exp2_title: string;
  sl_exp2_p1: string;
  sl_exp2_li1: string;
  sl_exp2_li2: string;
  sl_exp2_li3: string;
  sl_exp2_li4: string;
  sl_exp2_cta: string;
  sl_exp3_badge: string;
  sl_exp3_title: string;
  sl_exp3_p1: string;
  sl_exp3_card1: string;
  sl_exp3_card2: string;
  sl_exp3_card3: string;
  sl_exp3_card4: string;
  sl_exp4_badge: string;
  sl_exp4_title: string;
  sl_exp4_p1: string;
  sl_footer_title_1: string;
  sl_footer_title_2: string;
  sl_footer_p1: string;
  sl_footer_location: string;
  sl_footer_cta: string;
  sl_alt_hero: string;
  sl_alt_hiking: string;
  sl_alt_river: string;
  sl_alt_camping: string;
  sl_alt_cabin: string;
  sl_alt_pool: string;
  sl_alt_motorhome: string;
  sl_alt_forest: string;

  // Common
  loading: string;
  error: string;
};

const translations: Record<Language, TranslationKeys> = {
  es: {
    nav_home: 'Inicio',
    nav_accommodations: 'Alojamientos',
    nav_services: 'Servicios',
    nav_reviews: 'Opiniones',
    nav_contact: 'Contacto',
    nav_search_placeholder: 'Buscar cabañas, parcelas...',
    nav_guide: 'Guía del Entorno',
    hero_guide_cta: 'Conocé el Arequita',

    hero_title: 'Descubre la magia del Camping Arequita',
    hero_subtitle: 'Un paraíso natural en el corazón de Lavalleja. Cabañas premium, parcelas equipadas y experiencias únicas rodeados de la belleza de las sierras uruguayas.',
    hero_cta: 'Explorar Alojamientos',
    hero_secondary_cta: 'Ver Servicios',

    acc_title: 'Nuestros Alojamientos',
    acc_subtitle: 'Encuentra el espacio perfecto para tu estadía en plena naturaleza',
    acc_cabins: 'Cabañas',
    acc_motorhome: 'Motorhome',
    acc_camping: 'Parcelas',
    acc_per_night: '/noche',
    acc_available: 'disponibles',
    acc_persons: 'personas',
    acc_book_now: 'Reservar Ahora',
    acc_view_all: 'Ver todos los alojamientos',
    acc_promo: '¡Oferta!',
    acc_from: 'Desde',
    acc_amenities: 'Comodidades',
    acc_description: 'Descripción',
    acc_close: 'Cerrar',
    acc_filters: 'Filtros',
    acc_type: 'Tipo',
    acc_price_range: 'Rango de precio',
    acc_all_types: 'Todos',
    acc_sort_by: 'Ordenar por',
    acc_sort_price_low: 'Menor precio',
    acc_sort_price_high: 'Mayor precio',
    acc_results: 'resultados',
    acc_no_results: 'No se encontraron resultados',

    svc_title: 'Servicios & Actividades',
    svc_subtitle: 'Todo lo que necesitas para una estadía inolvidable',
    svc_pool_open: 'Piscina al Aire Libre',
    svc_pool_open_desc: 'Refrescate en nuestra amplia piscina al aire libre rodeada de naturaleza.',
    svc_pool_covered: 'Piscina Techada',
    svc_pool_covered_desc: 'Disfruta de la piscina climatizada cubierta en cualquier época del año.',
    svc_playground: 'Juegos Infantiles',
    svc_playground_desc: 'Área de juegos segura y divertida para los más pequeños.',
    svc_electricity: 'Electricidad',
    svc_electricity_desc: 'Todas las parcelas cuentan con conexión eléctrica incluida.',
    svc_parks: 'Parques y Paseos',
    svc_parks_desc: 'Senderos naturales y paseos por las sierras de Lavalleja.',
    svc_bbq: 'Parrilleros',
    svc_bbq_desc: 'Parrilleros individuales en cada espacio para el clásico asado.',
    svc_wifi: 'Wi-Fi Gratuito',
    svc_wifi_desc: 'Conexión Wi-Fi disponible en todas las áreas comunes.',
    svc_parking: 'Estacionamiento',
    svc_parking_desc: 'Estacionamiento gratuito junto a tu alojamiento.',

    rev_title: 'Opiniones',
    rev_subtitle: 'Experiencias reales de quienes eligieron Camping Arequita',
    rev_total: 'testimonios',

    sug_title: 'Buzón de Sugerencias',
    sug_subtitle: 'Tu opinión nos ayuda a mejorar. Cuéntanos cómo podemos hacer tu experiencia aún mejor.',
    sug_name: 'Tu nombre',
    sug_email: 'Tu email',
    sug_confirm_email: 'Confirmar email',
    sug_category: 'Categoría',
    sug_cat_general: 'General',
    sug_cat_services: 'Servicios',
    sug_cat_facilities: 'Instalaciones',
    sug_cat_activities: 'Actividades',
    sug_message: 'Tu sugerencia',
    sug_submit: 'Enviar Sugerencia',
    sug_success: '¡Gracias por tu sugerencia! La revisaremos pronto.',

    footer_desc: 'Camping municipal administrado por la Intendencia de Lavalleja. Un espacio natural único en las sierras uruguayas.',
    footer_links: 'Enlaces',
    footer_contact: 'Contacto',
    footer_rights: 'Todos los derechos reservados.',
    footer_managed: 'Administrado por la Intendencia de Lavalleja',

    search_title: 'Buscar Alojamientos',
    search_results_for: 'Resultados para',

    res_from: 'Desde',
    res_to: 'Hasta',
    res_guests: 'Huéspedes',
    res_submit: 'Enviar pre-reserva',
    res_full_name: 'Nombre Completo',
    res_phone: 'Teléfono',
    res_email: 'Email',
    res_confirm_email: 'Confirmar Email',
    res_notes: 'Notas (opcional)',
    res_notes_placeholder: 'Algún pedido o duda especial...',
    res_pay_arrival: 'Reserva ahora y paga al ingresar',

    sl_seo_title: 'Sentí Lavalleja | Camping Arequita',
    sl_seo_desc: 'Descubrí el Cerro Arequita, la Laguna de los Cuervos y el Camping Municipal Arequita. Naturaleza volcánica, río, aventura y energía ancestral en el corazón de Uruguay.',
    sl_hero_badge: 'Portal de Turismo • Uruguay',
    sl_hero_title_1: 'SENTÍ',
    sl_hero_title_2: 'LAVALLEJA',
    sl_hero_tagline: 'Naturaleza volcánica. Agua que da vida. Energía ancestral.',
    sl_hero_p1: 'En el corazón del sur de América, a solo 10 km de Minas, el majestuoso Cerro Arequita se eleva como un gigante de granito volcánico. A sus pies, abrazado por el Río Santa Lucía, el Camping Arequita ofrece una experiencia que no se visita: se siente.',
    sl_hero_cta_book: 'Reservar ahora',
    sl_hero_cta_explore: 'Explorar experiencias',
    sl_exp1_badge: 'Experiencia 1',
    sl_exp1_title: 'Manantiales Serranos',
    sl_exp1_p1: 'Manantiales Serranos es una invitación a vivir Lavalleja desde sus sierras, sus aguas y su historia profunda. Un territorio único donde la naturaleza, la geología y la cultura local se transforman en una experiencia auténtica, serena y memorable.',
    sl_exp1_p2: 'Podés escuchar el agua abrirse paso entre vertientes y saltos, respirar aire puro entre monte nativo y, al caer la noche, dejarte envolver por el cielo estrellado serrano.',
    sl_exp1_li1: 'Contemplar paredones rocosos, valles y cerros antiguos del geoparque',
    sl_exp1_li2: 'Recorrer senderos, grutas, roquedales y caminos rurales',
    sl_exp1_li3: 'Explorar geositios con historias de millones de años',
    sl_exp1_li4: 'Vivir contemplación y astroturismo en la noche serrana',
    sl_exp1_cta: 'Explorar alojamientos',
    sl_exp2_badge: 'Experiencia 2',
    sl_exp2_title: 'Agua que da Vida',
    sl_exp2_p1: 'El Río Santa Lucía nace en estas sierras. Aquí comienza el agua que abastece a millones. En la Laguna de los Cuervos, un ensanchamiento natural del río, el paisaje se vuelve espejo. Podés cruzar la laguna en balsa hacia el cerro vecino mientras el entorno vibra en silencio.',
    sl_exp2_li1: 'Kayak o travesía en balsa',
    sl_exp2_li2: 'Senderismo suave',
    sl_exp2_li3: 'Picnic serrano',
    sl_exp2_li4: 'Atardecer frente a la laguna',
    sl_exp2_cta: 'Descubrir más',
    sl_exp3_badge: 'Experiencia 3',
    sl_exp3_title: 'Naturaleza con Confort',
    sl_exp3_p1: 'Dormí rodeado de naturaleza sin renunciar a la comodidad contemporánea.',
    sl_exp3_card1: 'Parcelas con energía eléctrica y parrillero',
    sl_exp3_card2: 'Cabañas equipadas con aire y cocina',
    sl_exp3_card3: 'Piscinas abiertas y climatizada',
    sl_exp3_card4: 'Zona exclusiva para motorhomes',
    sl_exp4_badge: 'Experiencia 4',
    sl_exp4_title: 'Bosque y Silencio',
    sl_exp4_p1: 'Caminá entre ombúes de formas escultóricas. Escuchá el sonido del viento en los pastizales serranos. Aquí el tiempo no corre: se expande.',
    sl_footer_title_1: 'No es turismo.',
    sl_footer_title_2: 'Es transformación.',
    sl_footer_p1: 'Lavalleja no es un destino saturado. Es un secreto del sur del continente. El Camping Arequita es su puerta de entrada.',
    sl_footer_location: '10 KM DE MINAS • PIE DEL CERRO AREQUITA • RÍO SANTA LUCÍA',
    sl_footer_cta: 'Reservar tu experiencia',
    sl_alt_hero: 'Bosque y Cerro al amanecer',
    sl_alt_hiking: 'Montañas y Naturaleza',
    sl_alt_river: 'Río y Paisaje',
    sl_alt_camping: 'Parcelas de camping',
    sl_alt_cabin: 'Cabañas equipadas',
    sl_alt_pool: 'Piscinas',
    sl_alt_motorhome: 'Motorhomes',
    sl_alt_forest: 'Bosque y Silencio',

    loading: 'Cargando...',
    error: 'Ha ocurrido un error',
  },
  en: {
    nav_home: 'Home',
    nav_accommodations: 'Accommodations',
    nav_services: 'Services',
    nav_reviews: 'Testimonials',
    nav_contact: 'Contact',
    nav_search_placeholder: 'Search cabins, plots...',
    nav_guide: 'Area Guide',
    hero_guide_cta: 'Discover Arequita',

    hero_title: 'Discover the magic of Camping Arequita',
    hero_subtitle: 'A natural paradise in the heart of Lavalleja. Premium cabins, equipped plots, and unique experiences surrounded by the beauty of the Uruguayan sierras.',
    hero_cta: 'Explore Accommodations',
    hero_secondary_cta: 'View Services',

    acc_title: 'Our Accommodations',
    acc_subtitle: 'Find the perfect space for your stay in the heart of nature',
    acc_cabins: 'Cabins',
    acc_motorhome: 'Motorhome',
    acc_camping: 'Camping Plots',
    acc_per_night: '/night',
    acc_available: 'available',
    acc_persons: 'persons',
    acc_book_now: 'Book Now',
    acc_view_all: 'View all accommodations',
    acc_promo: 'Deal!',
    acc_from: 'From',
    acc_amenities: 'Amenities',
    acc_description: 'Description',
    acc_close: 'Close',
    acc_filters: 'Filters',
    acc_type: 'Type',
    acc_price_range: 'Price range',
    acc_all_types: 'All',
    acc_sort_by: 'Sort by',
    acc_sort_price_low: 'Lowest price',
    acc_sort_price_high: 'Highest price',
    acc_results: 'results',
    acc_no_results: 'No results found',

    svc_title: 'Services & Activities',
    svc_subtitle: 'Everything you need for an unforgettable stay',
    svc_pool_open: 'Outdoor Pool',
    svc_pool_open_desc: 'Cool off in our spacious outdoor pool surrounded by nature.',
    svc_pool_covered: 'Indoor Pool',
    svc_pool_covered_desc: 'Enjoy the heated indoor pool any time of year.',
    svc_playground: 'Playground',
    svc_playground_desc: 'Safe and fun play area for the little ones.',
    svc_electricity: 'Electricity',
    svc_electricity_desc: 'All plots include electrical connection.',
    svc_parks: 'Parks & Trails',
    svc_parks_desc: 'Natural trails and walks through the sierras of Lavalleja.',
    svc_bbq: 'BBQ Grills',
    svc_bbq_desc: 'Individual BBQ grills at each space for the classic cookout.',
    svc_wifi: 'Free Wi-Fi',
    svc_wifi_desc: 'Wi-Fi connection available in all common areas.',
    svc_parking: 'Parking',
    svc_parking_desc: 'Free parking next to your accommodation.',

    rev_title: 'Opinions',
    rev_subtitle: 'Real experiences from those who chose Camping Arequita',
    rev_total: 'testimonials',

    sug_title: 'Suggestion Box',
    sug_subtitle: 'Your opinion helps us improve. Tell us how we can make your experience even better.',
    sug_name: 'Your name',
    sug_email: 'Your email',
    sug_confirm_email: 'Confirm email',
    sug_category: 'Category',
    sug_cat_general: 'General',
    sug_cat_services: 'Services',
    sug_cat_facilities: 'Facilities',
    sug_cat_activities: 'Activities',
    sug_message: 'Your suggestion',
    sug_submit: 'Send Suggestion',
    sug_success: 'Thank you for your suggestion! We will review it soon.',

    footer_desc: 'Municipal camping managed by the Intendencia de Lavalleja. A unique natural space in the Uruguayan sierras.',
    footer_links: 'Links',
    footer_contact: 'Contact',
    footer_rights: 'All rights reserved.',
    footer_managed: 'Managed by Intendencia de Lavalleja',

    search_title: 'Search Accommodations',
    search_results_for: 'Results for',

    res_from: 'From',
    res_to: 'To',
    res_guests: 'Guests',
    res_submit: 'Send pre-reservation',
    res_full_name: 'Full Name',
    res_phone: 'Phone',
    res_email: 'Email',
    res_confirm_email: 'Confirm Email',
    res_notes: 'Notes (optional)',
    res_notes_placeholder: 'Any special request...',
    res_pay_arrival: 'Book now and pay on arrival',

    sl_seo_title: 'Feel Lavalleja | Camping Arequita',
    sl_seo_desc: 'Discover Cerro Arequita, Laguna de los Cuervos and Camping Municipal Arequita. Volcanic nature, river, adventure and ancestral energy in the heart of Uruguay.',
    sl_hero_badge: 'Tourism Portal • Uruguay',
    sl_hero_title_1: 'FEEL',
    sl_hero_title_2: 'LAVALLEJA',
    sl_hero_tagline: 'Volcanic nature. Water that gives life. Ancestral energy.',
    sl_hero_p1: 'In the heart of South America, just 10 km from Minas, the majestic Cerro Arequita rises like a giant of volcanic granite. At its feet, embraced by the Santa Lucía River, Camping Arequita offers an experience that is not visited: it is felt.',
    sl_hero_cta_book: 'Book now',
    sl_hero_cta_explore: 'Explore experiences',
    sl_exp1_badge: 'Experience 1',
    sl_exp1_title: 'The Ritual of the Hill',
    sl_exp1_p1: 'Climb Cerro Arequita at dawn. The granite still holds the cold of the night. The wind speaks to you. Climb the Pico del Águila, a unique rock formation in the world that kisses the sky. The horizon opens to 360 degrees. Discover the Arequita Grotto, a mineral cave where humidity and rock create an almost sacred microcosm.',
    sl_exp1_p2: 'This is a journey for those seeking deep connection, silence and ancestral energy.',
    sl_exp1_li1: 'Guided climb to the hill',
    sl_exp1_li2: 'Visit to the grotto',
    sl_exp1_li3: 'Meditation at dawn',
    sl_exp1_li4: 'Regional dinner under the stars',
    sl_exp1_cta: 'Live this experience',
    sl_exp2_badge: 'Experience 2',
    sl_exp2_title: 'Water that Gives Life',
    sl_exp2_p1: 'The Santa Lucía River is born in these hills. Here begins the water that supplies millions. In Laguna de los Cuervos, a natural widening of the river, the landscape becomes a mirror. You can cross the lagoon by raft towards the neighboring hill while the environment vibrates in silence.',
    sl_exp2_li1: 'Kayak or raft crossing',
    sl_exp2_li2: 'Light hiking',
    sl_exp2_li3: 'Highland picnic',
    sl_exp2_li4: 'Sunset in front of the lagoon',
    sl_exp2_cta: 'Discover more',
    sl_exp3_badge: 'Experience 3',
    sl_exp3_title: 'Nature with Comfort',
    sl_exp3_p1: 'Sleep surrounded by nature without giving up contemporary comfort.',
    sl_exp3_card1: 'Plots with electric power and grill',
    sl_exp3_card2: 'Cabins equipped with AC and kitchen',
    sl_exp3_card3: 'Open and heated pools',
    sl_exp3_card4: 'Exclusive area for motorhomes',
    sl_exp4_badge: 'Experience 4',
    sl_exp4_title: 'Forest and Silence',
    sl_exp4_p1: 'Walk among ombúes of sculptural shapes. Listen to the sound of the wind in the highland grasslands. Here time does not run: it expands.',
    sl_footer_title_1: "It's not tourism.",
    sl_footer_title_2: "It's transformation.",
    sl_footer_p1: 'Lavalleja is not a saturated destination. It is a secret of the south of the continent. Camping Arequita is its gateway.',
    sl_footer_location: '10 KM FROM MINAS • FOOT OF CERRO AREQUITA • SANTA LUCÍA RIVER',
    sl_footer_cta: 'Book your experience',
    sl_alt_hero: 'Forest and Hill at dawn',
    sl_alt_hiking: 'Mountains and Nature',
    sl_alt_river: 'River and Landscape',
    sl_alt_camping: 'Camping plots',
    sl_alt_cabin: 'Equipped cabins',
    sl_alt_pool: 'Swimming pools',
    sl_alt_motorhome: 'Motorhomes',
    sl_alt_forest: 'Forest and Silence',

    loading: 'Loading...',
    error: 'An error occurred',
  },
  pt: {
    nav_home: 'Início',
    nav_accommodations: 'Acomodações',
    nav_services: 'Serviços',
    nav_reviews: 'Depoimentos',
    nav_contact: 'Contato',
    nav_guide: 'Guia do Entorno',
    hero_guide_cta: 'Conheça o Arequita',
    nav_search_placeholder: 'Buscar cabanas, parcelas...',

    hero_title: 'Descubra a magia do Camping Arequita',
    hero_subtitle: 'Um paraíso natural no coração de Lavalleja. Cabanas premium, parcelas equipadas e experiências únicas cercadas pela beleza das serras uruguaias.',
    hero_cta: 'Explorar Acomodações',
    hero_secondary_cta: 'Ver Serviços',

    acc_title: 'Nossas Acomodações',
    acc_subtitle: 'Encontre o espaço perfeito para sua estadia em plena natureza',
    acc_cabins: 'Cabanas',
    acc_motorhome: 'Motorhome',
    acc_camping: 'Parcelas',
    acc_per_night: '/noite',
    acc_available: 'disponíveis',
    acc_persons: 'pessoas',
    acc_book_now: 'Reservar Agora',
    acc_view_all: 'Ver todas as acomodações',
    acc_promo: 'Oferta!',
    acc_from: 'A partir de',
    acc_amenities: 'Comodidades',
    acc_description: 'Descrição',
    acc_close: 'Fechar',
    acc_filters: 'Filtros',
    acc_type: 'Tipo',
    acc_price_range: 'Faixa de preço',
    acc_all_types: 'Todos',
    acc_sort_by: 'Ordenar por',
    acc_sort_price_low: 'Menor preço',
    acc_sort_price_high: 'Maior preço',
    acc_results: 'resultados',
    acc_no_results: 'Nenhum resultado encontrado',

    svc_title: 'Serviços & Atividades',
    svc_subtitle: 'Tudo o que você precisa para uma estadia inesquecível',
    svc_pool_open: 'Piscina ao Ar Livre',
    svc_pool_open_desc: 'Refresque-se em nossa ampla piscina ao ar livre cercada pela natureza.',
    svc_pool_covered: 'Piscina Coberta',
    svc_pool_covered_desc: 'Aproveite a piscina coberta aquecida em qualquer época do ano.',
    svc_playground: 'Playground',
    svc_playground_desc: 'Área de jogos segura e divertida para os pequenos.',
    svc_electricity: 'Eletricidade',
    svc_electricity_desc: 'Todas as parcelas incluem conexão elétrica.',
    svc_parks: 'Parques e Trilhas',
    svc_parks_desc: 'Trilhas naturais e passeios pelas serras de Lavalleja.',
    svc_bbq: 'Churrasqueiras',
    svc_bbq_desc: 'Churrasqueiras individuais em cada espaço para o clássico churrasco.',
    svc_wifi: 'Wi-Fi Gratuito',
    svc_wifi_desc: 'Conexão Wi-Fi disponível em todas as áreas comuns.',
    svc_parking: 'Estacionamento',
    svc_parking_desc: 'Estacionamento gratuito ao lado da sua acomodação.',

    rev_title: 'Opiniões',
    rev_subtitle: 'Experiências reais de quem escolheu o Camping Arequita',
    rev_total: 'depoimentos',

    sug_title: 'Caixa de Sugestões',
    sug_subtitle: 'Sua opinião nos ajuda a melhorar. Conte-nos como podemos tornar sua experiência ainda melhor.',
    sug_name: 'Seu nome',
    sug_email: 'Seu e-mail',
    sug_confirm_email: 'Confirmar e-mail',
    sug_category: 'Categoria',
    sug_cat_general: 'Geral',
    sug_cat_services: 'Serviços',
    sug_cat_facilities: 'Instalações',
    sug_cat_activities: 'Atividades',
    sug_message: 'Sua sugestão',
    sug_submit: 'Enviar Sugestão',
    sug_success: 'Obrigado pela sua sugestão! Vamos analisá-la em breve.',

    footer_desc: 'Camping municipal administrado pela Intendência de Lavalleja. Um espaço natural único nas serras uruguaias.',
    footer_links: 'Links',
    footer_contact: 'Contato',
    footer_rights: 'Todos os direitos reservados.',
    footer_managed: 'Administrado pela Intendência de Lavalleja',

    search_title: 'Buscar Acomodações',
    search_results_for: 'Resultados para',

    res_from: 'Desde',
    res_to: 'Até',
    res_guests: 'Hóspedes',
    res_submit: 'Enviar pré-reserva',
    res_full_name: 'Nome Completo',
    res_phone: 'Telefone',
    res_email: 'Email',
    res_confirm_email: 'Confirmar Email',
    res_notes: 'Notas (opcional)',
    res_notes_placeholder: 'Algum pedido especial...',
    res_pay_arrival: 'Reserve agora e pague ao chegar',

    sl_seo_title: 'Sinta Lavalleja | Camping Arequita',
    sl_seo_desc: 'Descubra o Cerro Arequita, a Laguna de los Cuervos e o Camping Municipal Arequita. Natureza vulcânica, rio, aventura e energia ancestral no coração do Uruguai.',
    sl_hero_badge: 'Portal de Turismo • Uruguai',
    sl_hero_title_1: 'SINTA',
    sl_hero_title_2: 'LAVALLEJA',
    sl_hero_tagline: 'Natureza vulcânica. Água que dá vida. Energia ancestral.',
    sl_hero_p1: 'No coração do sul da América, a apenas 10 km de Minas, o majestoso Cerro Arequita se eleva como um gigante de granito vulcânico. Aos seus pés, abraçado pelo Rio Santa Lucía, o Camping Arequita oferece uma experiência que não se visita: se sente.',
    sl_hero_cta_book: 'Reservar agora',
    sl_hero_cta_explore: 'Explorar experiências',
    sl_exp1_badge: 'Experiência 1',
    sl_exp1_title: 'O Ritual do Cerro',
    sl_exp1_p1: 'Suba ao Cerro Arequita ao amanhecer. O granito ainda guarda o frio da noite. O vento fala com você. Suba ao Pico do Águila, uma formação rochosa única no mundo que beija o céu. O horizonte se abre em 360 graus. Descubra a Gruta Arequita, uma caverna mineral onde a umidade e a rocha criam um microcosmos quase sagrado.',
    sl_exp1_p2: 'Esta é uma jornada para quem busca conexão profunda, silêncio e energia ancestral.',
    sl_exp1_li1: 'Subida guiada ao cerro',
    sl_exp1_li2: 'Visita à gruta',
    sl_exp1_li3: 'Meditação ao amanhecer',
    sl_exp1_li4: 'Jantar regional sob as estrelas',
    sl_exp1_cta: 'Viver esta experiência',
    sl_exp2_badge: 'Experiência 2',
    sl_exp2_title: 'Água que dá Vida',
    sl_exp2_p1: 'O Rio Santa Lucía nasce nestas serras. Aqui começa a água que abastece milhões. Na Laguna de los Cuervos, um alargamento natural do rio, a paisagem se torna um espelho. Você pode cruzar a lagoa em balsa rumo ao cerro vizinho enquanto o ambiente vibra em silêncio.',
    sl_exp2_li1: 'Kayak ou travessia em balsa',
    sl_exp2_li2: 'Caminhada suave',
    sl_exp2_li3: 'Picnic serrano',
    sl_exp2_li4: 'Pôr do sol em frente à lagoa',
    sl_exp2_cta: 'Descobrir mais',
    sl_exp3_badge: 'Experiência 3',
    sl_exp3_title: 'Natureza com Conforto',
    sl_exp3_p1: 'Durma cercado pela natureza sem abrir mão do conforto contemporâneo.',
    sl_exp3_card1: 'Parcelas com energia elétrica e churrasqueira',
    sl_exp3_card2: 'Cabanas equipadas com ar e cozinha',
    sl_exp3_card3: 'Piscinas abertas e climatizada',
    sl_exp3_card4: 'Zona exclusiva para motorhomes',
    sl_alt_hero: 'Bosque e Cerro ao amanhecer',
    sl_alt_hiking: 'Montanhas e Natureza',
    sl_alt_river: 'Rio e Paisagem',
    sl_alt_camping: 'Parcelas de camping',
    sl_alt_cabin: 'Cabanas equipadas',
    sl_alt_pool: 'Piscinas',
    sl_alt_motorhome: 'Motorhomes',
    sl_alt_forest: 'Bosque e Silêncio',
    sl_exp4_badge: 'Experiência 4',
    sl_exp4_title: 'Bosque e Silêncio',
    sl_exp4_p1: 'Caminhe entre ombúes de formas escultóricas. Ouça o som do vento nas pastagens serranas. Aqui o tempo não corre: ele se expande.',
    sl_footer_title_1: 'Não é turismo.',
    sl_footer_title_2: 'É transformação.',
    sl_footer_p1: 'Lavalleja não é um destino saturado. É um segredo do sul do continente. O Camping Arequita é a sua porta de entrada.',
    sl_footer_location: '10 KM DE MINAS • PÉ DO CERRO AREQUITA • RIO SANTA LUCÍA',
    sl_footer_cta: 'Reservar sua experiência',

    loading: 'Carregando...',
    error: 'Ocorreu um erro',
  },
  zh: {
    nav_home: '首页',
    nav_accommodations: '住宿',
    nav_services: '服务',
    nav_reviews: '评价',
    nav_contact: '联系',
    nav_search_placeholder: '搜索木屋、营位...',
    nav_guide: '周边指南',
    hero_guide_cta: '探索阿雷基塔',

    hero_title: '发现阿雷基塔露营地的魅力',
    hero_subtitle: '拉瓦列哈中心的自然天堂。高品质木屋、配套营位与独特体验，环绕在乌拉圭山地的自然之美中。',
    hero_cta: '浏览住宿',
    hero_secondary_cta: '查看服务',

    acc_title: '我们的住宿',
    acc_subtitle: '在自然之中找到最适合你停留的空间',
    acc_cabins: '木屋',
    acc_motorhome: '房车',
    acc_camping: '营位',
    acc_per_night: '/晚',
    acc_available: '可用',
    acc_persons: '人',
    acc_book_now: '立即预订',
    acc_view_all: '查看全部住宿',
    acc_promo: '优惠！',
    acc_from: '起价',
    acc_amenities: '设施',
    acc_description: '描述',
    acc_close: '关闭',
    acc_filters: '筛选',
    acc_type: '类型',
    acc_price_range: '价格范围',
    acc_all_types: '全部',
    acc_sort_by: '排序方式',
    acc_sort_price_low: '价格从低到高',
    acc_sort_price_high: '价格从高到低',
    acc_results: '条结果',
    acc_no_results: '未找到结果',

    svc_title: '服务与活动',
    svc_subtitle: '你需要的一切，打造难忘旅程',
    svc_pool_open: '露天泳池',
    svc_pool_open_desc: '在自然环绕中畅享宽敞露天泳池。',
    svc_pool_covered: '室内泳池',
    svc_pool_covered_desc: '全年都可享受恒温室内泳池。',
    svc_playground: '儿童游乐区',
    svc_playground_desc: '为小朋友打造安全有趣的游乐空间。',
    svc_electricity: '电力供应',
    svc_electricity_desc: '所有营位均提供电力连接。',
    svc_parks: '公园与步道',
    svc_parks_desc: '探索拉瓦列哈山地自然步道与散步路线。',
    svc_bbq: '烧烤区',
    svc_bbq_desc: '每个区域都配有独立烧烤设施。',
    svc_wifi: '免费 Wi-Fi',
    svc_wifi_desc: '公共区域均提供无线网络。',
    svc_parking: '停车',
    svc_parking_desc: '住宿旁可免费停车。',

    rev_title: '评价',
    rev_subtitle: '选择阿雷基塔露营地游客的真实体验',
    rev_total: '条评价',

    sug_title: '建议箱',
    sug_subtitle: '你的意见帮助我们不断改进。告诉我们如何让你的体验更好。',
    sug_name: '你的姓名',
    sug_email: '你的邮箱',
    sug_confirm_email: '确认邮箱',
    sug_category: '类别',
    sug_cat_general: '通用',
    sug_cat_services: '服务',
    sug_cat_facilities: '设施',
    sug_cat_activities: '活动',
    sug_message: '你的建议',
    sug_submit: '提交建议',
    sug_success: '感谢你的建议！我们会尽快查看。',

    footer_desc: '由拉瓦列哈市政府管理的市政露营地。乌拉圭山地中的独特自然空间。',
    footer_links: '链接',
    footer_contact: '联系',
    footer_rights: '保留所有权利。',
    footer_managed: '由拉瓦列哈市政府管理',

    search_title: '搜索住宿',
    search_results_for: '搜索结果：',

    res_from: '从',
    res_to: '到',
    res_guests: '住客',
    res_submit: '提交预订申请',
    res_full_name: '姓名',
    res_phone: '电话',
    res_email: '邮箱',
    res_confirm_email: '确认邮箱',
    res_notes: '备注（可选）',
    res_notes_placeholder: '任何特殊需求...',
    res_pay_arrival: '现在预订，入住付款',

    sl_seo_title: '感受拉瓦列哈 | 阿雷基塔露营地',
    sl_seo_desc: '探索阿雷基塔山、乌鸦潟湖与阿雷基塔市政露营地。在乌拉圭中心体验火山自然、河流、冒险与古老能量。',
    sl_hero_badge: '旅游门户 • 乌拉圭',
    sl_hero_title_1: '感受',
    sl_hero_title_2: '拉瓦列哈',
    sl_hero_tagline: '火山自然，生命之水，古老能量。',
    sl_hero_p1: '在南美洲南部中心，距离米纳斯仅 10 公里，雄伟的阿雷基塔山如火山花岗岩巨人般耸立。山脚下被圣卢西亚河环抱的阿雷基塔露营地，带来一种“不是参观，而是感受”的体验。',
    sl_hero_cta_book: '立即预订',
    sl_hero_cta_explore: '探索体验',
    sl_exp1_badge: '体验 1',
    sl_exp1_title: '山之仪式',
    sl_exp1_p1: '清晨登上阿雷基塔山。花岗岩仍带着夜晚寒意，风在耳边低语。登上老鹰峰（Pico del Águila），这是世界上独一无二的亲吻天空的岩层。地平线 360 度展开。探索阿雷基塔洞穴，在湿气与岩石之间感受近乎神圣的微观世界。',
    sl_exp1_p2: '这是一段适合追求深度连接、宁静与古老能量的旅程。',
    sl_exp1_li1: '导览登山',
    sl_exp1_li2: '洞穴探访',
    sl_exp1_li3: '日出冥想',
    sl_exp1_li4: '星空下的地方晚餐',
    sl_exp1_cta: '体验这一旅程',
    sl_exp2_badge: '体验 2',
    sl_exp2_title: '生命之水',
    sl_exp2_p1: '圣卢西亚河发源于此。这里是供给数百万人用水的起点。在乌鸦潟湖，河道自然变宽，风景宛如明镜。你可以乘筏横渡至对岸山丘，在宁静中感受环境的律动。',
    sl_exp2_li1: '皮划艇或木筏穿越',
    sl_exp2_li2: '轻徒步',
    sl_exp2_li3: '山地野餐',
    sl_exp2_li4: '潟湖日落',
    sl_exp2_cta: '了解更多',
    sl_exp3_badge: '体验 3',
    sl_exp3_title: '自然与舒适',
    sl_exp3_p1: '被自然环绕入眠，同时保有现代舒适。',
    sl_exp3_card1: '配电与烧烤设施的营位',
    sl_exp3_card2: '配有空调与厨房的木屋',
    sl_exp3_card3: '室外与恒温泳池',
    sl_exp3_card4: '房车专属区域',
    sl_exp4_badge: '体验 4',
    sl_exp4_title: '森林与宁静',
    sl_exp4_p1: '漫步于雕塑般形态的翁布树之间，聆听山地草原中的风声。在这里，时间不是流逝，而是舒展开来。',
    sl_footer_title_1: '这不只是旅游。',
    sl_footer_title_2: '而是蜕变。',
    sl_footer_p1: '拉瓦列哈不是拥挤热门景点，而是南美南部的一处秘境。阿雷基塔露营地是进入它的大门。',
    sl_footer_location: '距米纳斯 10 公里 • 阿雷基塔山脚 • 圣卢西亚河',
    sl_footer_cta: '预订你的体验',
    sl_alt_hero: '黎明时的森林与山丘',
    sl_alt_hiking: '群山与自然',
    sl_alt_river: '河流与风景',
    sl_alt_camping: '露营营位',
    sl_alt_cabin: '配套木屋',
    sl_alt_pool: '泳池',
    sl_alt_motorhome: '房车区域',
    sl_alt_forest: '森林与宁静',

    loading: '加载中...',
    error: '发生错误',
  },
};

export function t(key: keyof TranslationKeys, lang: Language): string {
  return translations[lang]?.[key] || translations.es[key] || key;
}
