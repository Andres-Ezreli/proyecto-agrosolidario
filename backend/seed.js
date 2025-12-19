require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const UserProfile = require('./models/UserProfile');
const Oferta = require('./models/Oferta');
const Trabajador = require('./models/Trabajador');
const Solicitud = require('./models/Solicitud');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await UserProfile.deleteMany({});
    await Oferta.deleteMany({});
    await Trabajador.deleteMany({});
    await Solicitud.deleteMany({});
    console.log('✓ Cleared existing data');

    // ==================== PROPIETARIOS (Farm Owners) ====================
    const propietarios = await User.create([
      { nombre: 'Carlos Alberto Rodríguez', email: 'carlos@finca.com', password: 'Password123', role: 'propietario' },
      { nombre: 'María Elena Gómez', email: 'maria@finca.com', password: 'Password123', role: 'propietario' },
      { nombre: 'José Fernando López', email: 'jose@finca.com', password: 'Password123', role: 'propietario' },
      { nombre: 'Ana Patricia Martínez', email: 'ana@finca.com', password: 'Password123', role: 'propietario' },
      { nombre: 'Pedro Luis Hernández', email: 'pedro@finca.com', password: 'Password123', role: 'propietario' },
    ]);
    console.log('✓ Created 5 propietarios');

    // ==================== PERSONAS (Workers) ====================
    const personas = await User.create([
      { nombre: 'Julio Gonzalo García López', email: 'julio@email.com', password: 'Password123', role: 'persona' },
      { nombre: 'Rosa María Pérez', email: 'rosa@email.com', password: 'Password123', role: 'persona' },
      { nombre: 'Miguel Ángel Torres', email: 'miguel@email.com', password: 'Password123', role: 'persona' },
      { nombre: 'Carmen Lucía Vargas', email: 'carmen@email.com', password: 'Password123', role: 'persona' },
      { nombre: 'Andrés Felipe Ruiz', email: 'andres@email.com', password: 'Password123', role: 'persona' },
      { nombre: 'Luz Marina Castillo', email: 'luz@email.com', password: 'Password123', role: 'persona' },
      { nombre: 'Diego Armando Silva', email: 'diego@email.com', password: 'Password123', role: 'persona' },
      { nombre: 'Patricia Elena Moreno', email: 'patricia@email.com', password: 'Password123', role: 'persona' },
      { nombre: 'Juan Pablo Ramírez', email: 'juanpablo@email.com', password: 'Password123', role: 'persona' },
      { nombre: 'Sandra Milena Ortiz', email: 'sandra@email.com', password: 'Password123', role: 'persona' },
    ]);
    console.log('✓ Created 10 personas (workers)');

    // ==================== PROPIETARIO PROFILES ====================
    const propietarioProfiles = await UserProfile.create([
      {
        userId: propietarios[0]._id,
        numeroDocumento: '1234567890',
        ubicacion: 'San Vicente, Antioquia',
        numeroCelular: '3101234567',
        nombreFinca: 'Finca El Café Dorado',
        ubicacionFinca: 'Vereda Las Flores, San Vicente, Antioquia',
        tamano: '25 hectáreas',
        tipo_prod: 'Café y plátano',
        desc_finca: 'Finca cafetera tradicional con cultivos de café arábigo de alta calidad. Cuenta con beneficiadero propio y secaderos solares.',
      },
      {
        userId: propietarios[1]._id,
        numeroDocumento: '2345678901',
        ubicacion: 'Andes, Antioquia',
        numeroCelular: '3112345678',
        nombreFinca: 'Hacienda La Esperanza',
        ubicacionFinca: 'Vereda El Carmelo, Andes, Antioquia',
        tamano: '40 hectáreas',
        tipo_prod: 'Café especial',
        desc_finca: 'Hacienda especializada en café de origen con certificación de comercio justo. Altitud de 1800 msnm ideal para café especial.',
      },
      {
        userId: propietarios[2]._id,
        numeroDocumento: '3456789012',
        ubicacion: 'Manizales, Caldas',
        numeroCelular: '3123456789',
        nombreFinca: 'Finca Los Naranjos',
        ubicacionFinca: 'Vereda La Cabaña, Manizales, Caldas',
        tamano: '18 hectáreas',
        tipo_prod: 'Cítricos y aguacate',
        desc_finca: 'Finca diversificada con cultivos de naranja, limón, mandarina y aguacate Hass para exportación.',
      },
      {
        userId: propietarios[3]._id,
        numeroDocumento: '4567890123',
        ubicacion: 'Armenia, Quindío',
        numeroCelular: '3134567890',
        nombreFinca: 'Finca Villa María',
        ubicacionFinca: 'Vereda Barcelona, Armenia, Quindío',
        tamano: '30 hectáreas',
        tipo_prod: 'Café y turismo rural',
        desc_finca: 'Finca cafetera con componente de agroturismo. Ofrece recorridos guiados y experiencias de recolección de café.',
      },
      {
        userId: propietarios[4]._id,
        numeroDocumento: '5678901234',
        ubicacion: 'Pereira, Risaralda',
        numeroCelular: '3145678901',
        nombreFinca: 'Hacienda El Porvenir',
        ubicacionFinca: 'Vereda Alta Gracia, Pereira, Risaralda',
        tamano: '50 hectáreas',
        tipo_prod: 'Caña panelera y café',
        desc_finca: 'Gran hacienda con trapiche tradicional para producción de panela orgánica y cultivos de café caturra.',
      },
    ]);
    console.log('✓ Created 5 propietario profiles');

    // ==================== PERSONA PROFILES (Workers) ====================
    const personaProfiles = await UserProfile.create([
      {
        userId: personas[0]._id,
        numeroDocumento: '1098765432',
        ubicacion: 'San Vicente, Antioquia',
        numeroCelular: '3201234567',
        desc_exp: 'Experiencia de 10 años en recolección de café. Conocimiento en selección de grano maduro y manejo de canastos.',
        habilidades: 'Recolección de café, Conducción de vehículos, Manejo de motosierra',
        anios: 10,
        edad: 32,
      },
      {
        userId: personas[1]._id,
        numeroDocumento: '1098765433',
        ubicacion: 'Medellín, Antioquia',
        numeroCelular: '3202345678',
        desc_exp: 'Trabajé 5 años en fincas ganaderas y 3 años en cultivos de hortalizas. Conozco sistemas de riego.',
        habilidades: 'Ganadería, Horticultura, Sistemas de riego, Conducción de tractores',
        anios: 8,
        edad: 28,
      },
      {
        userId: personas[2]._id,
        numeroDocumento: '1098765434',
        ubicacion: 'Andes, Antioquia',
        numeroCelular: '3203456789',
        desc_exp: 'Recolector de café con experiencia en fincas de café especial. Capacitado en procesos de beneficio húmedo.',
        habilidades: 'Recolección selectiva, Beneficio de café, Secado de café',
        anios: 12,
        edad: 35,
      },
      {
        userId: personas[3]._id,
        numeroDocumento: '1098765435',
        ubicacion: 'Manizales, Caldas',
        numeroCelular: '3204567890',
        desc_exp: 'Experiencia en cultivos de frutas tropicales. Conocimiento en podas, fertilización y control de plagas.',
        habilidades: 'Fruticultura, Podas, Fumigación, Empaque de frutas',
        anios: 6,
        edad: 30,
      },
      {
        userId: personas[4]._id,
        numeroDocumento: '1098765436',
        ubicacion: 'Armenia, Quindío',
        numeroCelular: '3205678901',
        desc_exp: 'Jornalero con experiencia variada en diferentes tipos de cultivos. Dispuesto a aprender nuevas técnicas.',
        habilidades: 'Siembra, Cosecha, Limpieza de terrenos, Construcción rural',
        anios: 4,
        edad: 25,
      },
      {
        userId: personas[5]._id,
        numeroDocumento: '1098765437',
        ubicacion: 'Pereira, Risaralda',
        numeroCelular: '3206789012',
        desc_exp: 'Mujer campesina con experiencia en cocina para grupos de trabajadores y labores de postcosecha.',
        habilidades: 'Cocina rural, Selección de café, Empaque, Administración básica',
        anios: 15,
        edad: 42,
      },
      {
        userId: personas[6]._id,
        numeroDocumento: '1098765438',
        ubicacion: 'Chinchiná, Caldas',
        numeroCelular: '3207890123',
        desc_exp: 'Operador de maquinaria agrícola. Experiencia con tractores, guadañas y equipos de fumigación.',
        habilidades: 'Operación de tractores, Fumigación técnica, Mantenimiento de equipos',
        anios: 7,
        edad: 33,
      },
      {
        userId: personas[7]._id,
        numeroDocumento: '1098765439',
        ubicacion: 'Salento, Quindío',
        numeroCelular: '3208901234',
        desc_exp: 'Experiencia en fincas turísticas. Conocimiento en atención al cliente y guianza de recorridos agrícolas.',
        habilidades: 'Atención al turista, Guianza, Recolección de café, Barismo básico',
        anios: 3,
        edad: 24,
      },
      {
        userId: personas[8]._id,
        numeroDocumento: '1098765440',
        ubicacion: 'Santa Rosa de Cabal, Risaralda',
        numeroCelular: '3209012345',
        desc_exp: 'Trabajador agrícola con conocimientos en producción de panela. Experiencia en trapiches tradicionales.',
        habilidades: 'Producción de panela, Corte de caña, Manejo de hornillas, Empaque',
        anios: 9,
        edad: 38,
      },
      {
        userId: personas[9]._id,
        numeroDocumento: '1098765441',
        ubicacion: 'Filandia, Quindío',
        numeroCelular: '3200123456',
        desc_exp: 'Joven emprendedora rural con estudios técnicos en agricultura. Experiencia en cultivos orgánicos.',
        habilidades: 'Agricultura orgánica, Compostaje, Huerta casera, Manejo de viveros',
        anios: 2,
        edad: 22,
      },
    ]);
    console.log('✓ Created 10 persona profiles');

    // ==================== TRABAJADORES (Worker Search Profiles) ====================
    const trabajadores = await Trabajador.create([
      { userId: personas[0]._id, edad: 32, ubicacion: 'San Vicente, Antioquia', habilidades: 'Recolección de café, Conducción, Motosierra', disponible: true, experiencia: '10 años en recolección de café' },
      { userId: personas[1]._id, edad: 28, ubicacion: 'Medellín, Antioquia', habilidades: 'Ganadería, Horticultura, Riego', disponible: true, experiencia: '8 años en fincas diversas' },
      { userId: personas[2]._id, edad: 35, ubicacion: 'Andes, Antioquia', habilidades: 'Café especial, Beneficio, Secado', disponible: true, experiencia: '12 años en café especial' },
      { userId: personas[3]._id, edad: 30, ubicacion: 'Manizales, Caldas', habilidades: 'Fruticultura, Podas, Fumigación', disponible: true, experiencia: '6 años en frutales' },
      { userId: personas[4]._id, edad: 25, ubicacion: 'Armenia, Quindío', habilidades: 'Siembra, Cosecha, Construcción rural', disponible: true, experiencia: '4 años como jornalero' },
      { userId: personas[5]._id, edad: 42, ubicacion: 'Pereira, Risaralda', habilidades: 'Cocina rural, Selección de café, Empaque', disponible: false, experiencia: '15 años en labores rurales' },
      { userId: personas[6]._id, edad: 33, ubicacion: 'Chinchiná, Caldas', habilidades: 'Tractores, Fumigación técnica, Mantenimiento', disponible: true, experiencia: '7 años como operador' },
      { userId: personas[7]._id, edad: 24, ubicacion: 'Salento, Quindío', habilidades: 'Turismo rural, Guianza, Barismo', disponible: true, experiencia: '3 años en agroturismo' },
      { userId: personas[8]._id, edad: 38, ubicacion: 'Santa Rosa de Cabal, Risaralda', habilidades: 'Panela, Corte de caña, Hornillas', disponible: true, experiencia: '9 años en trapiches' },
      { userId: personas[9]._id, edad: 22, ubicacion: 'Filandia, Quindío', habilidades: 'Agricultura orgánica, Compostaje, Viveros', disponible: true, experiencia: '2 años en cultivos orgánicos' },
    ]);
    console.log('✓ Created 10 trabajador search profiles');

    // ==================== OFERTAS (Job Offers) ====================
    const ofertas = await Oferta.create([
      {
        userId: propietarios[0]._id,
        titulo: 'Recolectores de café - Temporada alta',
        descripcion: 'Se necesitan recolectores de café para la temporada de cosecha. El trabajo consiste en recolección selectiva de granos maduros.',
        requisitos: 'Experiencia mínima de 1 año en recolección de café. Capacidad para cargar canastos de 20kg. Disponibilidad inmediata.',
        salario: 1500000,
        numeroTrabajadores: 8,
        fechaInicio: '15/01/2025',
        estado: 'activa',
      },
      {
        userId: propietarios[0]._id,
        titulo: 'Operador de beneficiadero',
        descripcion: 'Buscamos operador para el beneficiadero de café. Incluye despulpado, fermentación y lavado del grano.',
        requisitos: 'Conocimiento en proceso de beneficio húmedo. Experiencia de al menos 2 años. Responsable y puntual.',
        salario: 1800000,
        numeroTrabajadores: 2,
        fechaInicio: '10/01/2025',
        estado: 'activa',
      },
      {
        userId: propietarios[1]._id,
        titulo: 'Catadores y seleccionadores de café',
        descripcion: 'Para nuestra finca de café especial necesitamos personal para selección manual de granos y apoyo en cata.',
        requisitos: 'Buen sentido del olfato y gusto. Capacitación previa en selección de café es un plus. Atención al detalle.',
        salario: 1600000,
        numeroTrabajadores: 4,
        fechaInicio: '20/01/2025',
        estado: 'activa',
      },
      {
        userId: propietarios[2]._id,
        titulo: 'Trabajadores para cosecha de cítricos',
        descripcion: 'Necesitamos personal para recolección de naranjas y limones. Trabajo en altura con escaleras.',
        requisitos: 'No tener vértigo. Capacidad física para trabajo en escaleras. Cuidado con la fruta para evitar daños.',
        salario: 1400000,
        numeroTrabajadores: 6,
        fechaInicio: '05/01/2025',
        estado: 'activa',
      },
      {
        userId: propietarios[2]._id,
        titulo: 'Podador de árboles frutales',
        descripcion: 'Se requiere podador con experiencia para mantenimiento de árboles de aguacate y cítricos.',
        requisitos: 'Experiencia comprobada en podas de formación y mantenimiento. Manejo de herramientas de poda.',
        salario: 1700000,
        numeroTrabajadores: 2,
        fechaInicio: '08/01/2025',
        estado: 'activa',
      },
      {
        userId: propietarios[3]._id,
        titulo: 'Guía turístico para finca cafetera',
        descripcion: 'Buscamos persona carismática para guiar recorridos turísticos por nuestra finca cafetera.',
        requisitos: 'Buena comunicación verbal. Conocimiento básico sobre café. Inglés básico es un plus.',
        salario: 1300000,
        numeroTrabajadores: 2,
        fechaInicio: '01/02/2025',
        estado: 'activa',
      },
      {
        userId: propietarios[3]._id,
        titulo: 'Barista para experiencia de café',
        descripcion: 'Necesitamos barista para preparar café a visitantes de nuestra finca turística.',
        requisitos: 'Curso de barismo. Experiencia en preparación de métodos filtrados. Presentación personal impecable.',
        salario: 1500000,
        numeroTrabajadores: 1,
        fechaInicio: '01/02/2025',
        estado: 'activa',
      },
      {
        userId: propietarios[4]._id,
        titulo: 'Corteros de caña panelera',
        descripcion: 'Se necesitan corteros de caña para zafra. Trabajo físicamente exigente pero bien remunerado.',
        requisitos: 'Experiencia en corte de caña. Resistencia física. Manejo de machete. Mayores de 18 años.',
        salario: 2000000,
        numeroTrabajadores: 10,
        fechaInicio: '12/01/2025',
        estado: 'activa',
      },
      {
        userId: propietarios[4]._id,
        titulo: 'Operador de trapiche',
        descripcion: 'Buscamos operador para trapiche panelero. Incluye molienda, evaporación y moldeo de panela.',
        requisitos: 'Experiencia en producción de panela. Conocimiento de temperaturas de punto. Trabajo nocturno ocasional.',
        salario: 1900000,
        numeroTrabajadores: 3,
        fechaInicio: '12/01/2025',
        estado: 'activa',
      },
      {
        userId: propietarios[1]._id,
        titulo: 'Administrador de finca cafetera',
        descripcion: 'Buscamos administrador para supervisar todas las operaciones de la finca. Incluye vivienda.',
        requisitos: 'Experiencia mínima 5 años administrando fincas. Liderazgo. Conocimientos contables básicos.',
        salario: 2500000,
        numeroTrabajadores: 1,
        fechaInicio: '01/03/2025',
        estado: 'activa',
      },
    ]);
    console.log('✓ Created 10 ofertas');

    // ==================== SOLICITUDES (Job Applications) ====================
    const solicitudes = await Solicitud.create([
      { ofertaId: ofertas[0]._id, trabajadorId: trabajadores[0]._id, propietarioId: propietarios[0]._id, estado: 'pendiente', mensaje: 'Tengo amplia experiencia en recolección de café, me interesa la oferta.' },
      { ofertaId: ofertas[0]._id, trabajadorId: trabajadores[2]._id, propietarioId: propietarios[0]._id, estado: 'aceptada', mensaje: 'Soy especialista en café, puedo empezar de inmediato.' },
      { ofertaId: ofertas[1]._id, trabajadorId: trabajadores[2]._id, propietarioId: propietarios[0]._id, estado: 'pendiente', mensaje: 'Conozco todo el proceso de beneficio, estoy interesado.' },
      { ofertaId: ofertas[2]._id, trabajadorId: trabajadores[0]._id, propietarioId: propietarios[1]._id, estado: 'pendiente', mensaje: 'Me gustaría aprender sobre café especial.' },
      { ofertaId: ofertas[3]._id, trabajadorId: trabajadores[3]._id, propietarioId: propietarios[2]._id, estado: 'aceptada', mensaje: 'Tengo experiencia en frutales, puedo trabajar en altura.' },
      { ofertaId: ofertas[4]._id, trabajadorId: trabajadores[3]._id, propietarioId: propietarios[2]._id, estado: 'pendiente', mensaje: 'Sé podar árboles frutales, estoy disponible.' },
      { ofertaId: ofertas[5]._id, trabajadorId: trabajadores[7]._id, propietarioId: propietarios[3]._id, estado: 'aceptada', mensaje: 'Tengo experiencia en turismo rural y hablo algo de inglés.' },
      { ofertaId: ofertas[6]._id, trabajadorId: trabajadores[7]._id, propietarioId: propietarios[3]._id, estado: 'pendiente', mensaje: 'Tengo curso de barismo y me apasiona el café.' },
      { ofertaId: ofertas[7]._id, trabajadorId: trabajadores[8]._id, propietarioId: propietarios[4]._id, estado: 'aceptada', mensaje: 'Llevo años cortando caña, conozco bien el trabajo.' },
      { ofertaId: ofertas[8]._id, trabajadorId: trabajadores[8]._id, propietarioId: propietarios[4]._id, estado: 'pendiente', mensaje: 'También sé operar el trapiche, puedo hacer ambas labores.' },
      { ofertaId: ofertas[9]._id, trabajadorId: trabajadores[5]._id, propietarioId: propietarios[1]._id, estado: 'pendiente', mensaje: 'Tengo experiencia administrando y puedo mudarme a la finca.' },
      { ofertaId: ofertas[0]._id, trabajadorId: trabajadores[4]._id, propietarioId: propietarios[0]._id, estado: 'rechazada', mensaje: 'Quiero aprender a recolectar café.' },
      // Solicitudes enviadas A JULIO (trabajadores[0]) por propietarios
      { ofertaId: ofertas[0]._id, trabajadorId: trabajadores[0]._id, propietarioId: propietarios[0]._id, estado: 'pendiente', mensaje: 'Hola Julio, vi tu perfil y me interesa que trabajes en mi finca. Necesito recolectores con tu experiencia.', tipo: 'propietario_a_trabajador' },
      { ofertaId: ofertas[1]._id, trabajadorId: trabajadores[0]._id, propietarioId: propietarios[0]._id, estado: 'pendiente', mensaje: 'Julio, también tengo una vacante en el beneficiadero si te interesa. Pagaría bien.', tipo: 'propietario_a_trabajador' },
      { ofertaId: ofertas[2]._id, trabajadorId: trabajadores[0]._id, propietarioId: propietarios[1]._id, estado: 'aceptada', mensaje: 'Buenos días Julio, en Hacienda La Esperanza buscamos gente como tú. ¿Te interesa?', tipo: 'propietario_a_trabajador' },
      { ofertaId: ofertas[7]._id, trabajadorId: trabajadores[0]._id, propietarioId: propietarios[4]._id, estado: 'pendiente', mensaje: 'Julio, sé que tu experiencia es en café pero pagamos muy bien el corte de caña. ¿Considerarías?', tipo: 'propietario_a_trabajador' },
    ]);
    console.log('✓ Created 16 solicitudes');

    // ==================== SUMMARY ====================
    console.log('\n✅ ========== DATABASE SEEDED SUCCESSFULLY ==========\n');
    
    console.log('📊 RESUMEN:');
    console.log('   • 5 Propietarios de finca');
    console.log('   • 10 Personas en situación de desplazamiento');
    console.log('   • 15 Perfiles de usuario');
    console.log('   • 10 Trabajadores (búsqueda)');
    console.log('   • 10 Ofertas de empleo');
    console.log('   • 12 Solicitudes de empleo\n');

    console.log('🔐 CUENTAS DE PRUEBA (Contraseña: Password123):\n');
    
    console.log('   PROPIETARIOS:');
    console.log('   • carlos@finca.com - Finca El Café Dorado');
    console.log('   • maria@finca.com - Hacienda La Esperanza');
    console.log('   • jose@finca.com - Finca Los Naranjos');
    console.log('   • ana@finca.com - Finca Villa María');
    console.log('   • pedro@finca.com - Hacienda El Porvenir\n');
    
    console.log('   PERSONAS (Trabajadores):');
    console.log('   • julio@email.com - Recolector de café');
    console.log('   • rosa@email.com - Ganadería y horticultura');
    console.log('   • miguel@email.com - Café especial');
    console.log('   • carmen@email.com - Fruticultura');
    console.log('   • andres@email.com - Jornalero');
    console.log('   • luz@email.com - Cocina rural');
    console.log('   • diego@email.com - Operador maquinaria');
    console.log('   • patricia@email.com - Turismo rural');
    console.log('   • juanpablo@email.com - Producción panela');
    console.log('   • sandra@email.com - Agricultura orgánica');

    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

seedDatabase();
