# Manual Tecnico
## Introducción

   El proyecto "LORA" emerge como una solución para la gestión eficiente de lecturas de medidores de energía eléctrica. Esta aplicación redefine la experiencia de controlar el consumo eléctrico, proporcionando a usuarios y supervisores una plataforma integral y confiable desde la seguridad en la autenticación hasta los reportes mediante graficas.

## Descripción del proyecto

   A través de la simulación de señales LORA, los datos se transfieren eficientemente a un servidor y se comparan con una base de datos simulada de ELFEC para calcular los costos de consumo energético en periodos diarios y mensuales. El objetivo principal es optimizar el proceso de cobro en función del consumo real de energía. Este proyecto busca maximizar la eficiencia en la gestión de datos y mejorar la precisión en la facturación de servicios eléctricos.

## Roles / integrantes

   Kevin Davor Vergara Orellana/Team Leader

   Josep Bradley Donaire Flores/GIT Master

   Erlan Luis Vedia Herrera/DB Architect

   Franco Andre Rojas Morales Bermudez/QA Tester

## Arquitectura del software

   La arquitectura de "LORA" se basa en un modelo cliente-servidor, con una aplicación web/móvil que interactúa con un servidor central y una base de datos. Los componentes principales incluyen:

- **Cliente:** Interfaz web/móvil para clientes y supervisores.
- **Servidor:** Gestiona la lógica de negocios y se comunica con la base de datos.
- **Base de Datos:** Almacena información crítica sobre los medidores, el consumo y facturas.
- **API/Servicios Web:** Facilita la comunicación entre el cliente y el servidor y almacena a los usuarios.

Se emplean patrones de diseño como el Modelo-Vista-Controlador (MVC) para la simulación de la API.

## Requisitos del sistema
- Requerimientos de Hardware (mínimo): (cliente)
  - Sistema operativo
  - Procesador Core i3 7th Gen
  - Memoria RAM 4Gb
  - Espacio en disco 10 GB
  - Conexión a internet
- Requerimientos de Software: (cliente)
  - Sistema operativo Windows 10/Linux
  - Conexión a Internet
  - Navegador Web Chrome, Opera, Edge
- Requerimientos de Hardware (server/ hosting/BD)
  - Sistema operativo
  - Procesador Core i5 9th Gen
  - Memoria RAM 8Gb
  - Espacio en disco 40 GB
- Requerimientos de Software (server/ hosting/BD)
  - Sistema operativo
  - Conexión a Internet
  - Conexión a la BD
  - Conexión a la simulación Mqtt

## Instalación y configuración 
1. **Descarga del Software**
- Accede al repositorio del proyecto en [JDonaireF/PRIII-LORA](https://github.com/JDonaireF/PRIII-LORA/).
- Haz clic en el botón "Clone" o "Download" para descargar el código fuente.

2. **Instalación del Software**

   ***Nota:** Se requiere de tener instalado node.js.*

- Abre una terminal o línea de comandos.
- Navega al directorio donde descargaste el código fuente.
- Ejecuta los siguientes comandos de instalación:
```bash
npm install mysql2 axios

npm install next-pwa

npm install react-icons --save

npm install @headlessui/react 

npm install next-auth

npm install --save chart.js react-chartjs-2
```
Estos comandos instalarán las dependencias del proyecto.

3. **Configuración del Software:**
- Abre el archivo de configuración **next.config.js** en un editor de texto.
- Verifica si las configuraciones son las siguientes:
```bash
const nextConfig = {

...withPWA({

`        `dest: 'public',

`        `register: 'true',

`        `skipWaiting: 'true',

`    `})

}

module.exports = nextConfig
```
4. **Establecer Conexión con Base de Datos:**

   El software utiliza una base de datos en MySQL, asegúrese de que el servidor de la base de datos esté en funcionamiento.

   Abre el archivo de configuración de la base de datos en la carpeta **config** el archivo **db.js** y proporciona los detalles de conexión:
```bash
const pool = createPool({

`    `host: 'localhost',

`    `user: usuario,

`    `password: 'contraseña',

`    `port: 'puerto',

`    `database: 'nombre\_de\_la\_base\_de\_datos'

})
```
5. **Iniciar la Aplicación:**
- Regresa a la terminal.
- Ejecuta el siguiente comando para iniciar la aplicación:
```bash
npm run dev
```
6. **Verificar la Conexión:**
- Abre un navegador web.
- Accede a la aplicación en local [http://localhost:3000](http://localhost:300).
- Verifica que la aplicación esté funcionando correctamente.

## PROCEDIMIENTO DE HOSTEADO / HOSTING (configuración)
- **Sitio Web.**
  
   Compilación del código mediante el comando npm run build. 
Utilización del proveedor de hosting Vercel. 
Configuración del despliegue automático desde el repositorio. 
Definición de variables de entorno esenciales, como las API endpoints y claves de acceso. 

- **B.D.**

   Ejecutar el script en el servidor 
Script:
```bash
CREATE TABLE Medidor (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    NumeroMedidor VARCHAR(255),
    Zona VARCHAR(255),
    Estado TINYINT DEFAULT 1,
    FechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FechaActualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Consumo (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Consumo FLOAT,
    Lectura VARCHAR(255),
    Costo DECIMAL(10, 2) DEFAULT NULL,
    FechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FechaActualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    IdMedidor INT,
    FOREIGN KEY (IdMedidor) REFERENCES Medidor(Id)
);

CREATE TABLE Factura (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    NumeroMedidor VARCHAR(255),
    ConsumoFinal FLOAT,
    LecturaFinal VARCHAR(255),
	CostoTotal FLOAT,
    Estado TINYINT NOT NULL DEFAULT 0,
    FechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FechaActualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    IdMedidor INT,
    FOREIGN KEY (IdMedidor) REFERENCES Medidor(Id)
);

DELIMITER //

CREATE EVENT IF NOT EXISTS `Generar_Factura_Mensual` 
ON SCHEDULE EVERY 1 MONTH STARTS (CURRENT_DATE + INTERVAL 1 DAY)
DO
BEGIN
    -- Obtener el último consumo para cada medidor
    INSERT INTO Factura (NumeroMedidor, ConsumoFinal, LecturaFinal, CostoTotal, FechaRegistro, FechaActualizacion, IdMedidor)
    SELECT 
        m.NumeroMedidor,
        c.Consumo,
        c.Lectura,
        c.Costo,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP,
        c.IdMedidor
    FROM Consumo c
    JOIN Medidores m ON c.IdMedidor = m.Id
    WHERE MONTH(c.FechaRegistro) = MONTH(NOW()) AND YEAR(c.FechaRegistro) = YEAR(NOW())
    AND NOT EXISTS (
        SELECT 1
        FROM Factura f
        WHERE f.IdMedidor = c.IdMedidor
        AND MONTH(f.FechaActualizacion) = MONTH(NOW()) AND YEAR(f.FechaActualizacion) = YEAR(NOW())
    );
END//

DELIMITER ;

INSERT INTO Medidor (NumeroMedidor, Zona) VALUES
('0N1DQI45', 'Cala Cala'),
('D7291D13', 'Tiquipaya'),
('Y12FG01J', 'Sacaba'),
('CN12237F', 'Quillacollo'),
('12H8A0E3', 'Cala Cala'),
('2L3T1G89', 'Tiquipaya'),
('J102U3D4', 'Cala Cala');

INSERT INTO Consumo (Consumo, Lectura, Costo, FechaRegistro, FechaActualizacion, IdMedidor) VALUES
(100.5, '7584', 50, '2023-07-03 16:51:44', '2023-10-03 16:51:44', 1),
(75.2, '6178', 35, '2023-07-03 16:51:44', '2023-10-03 16:51:44', 2),
(120.8, '8481', 60, '2023-07-03 16:51:44', '2023-10-03 16:51:44', 3),
(90.3, '7122', 45, '2023-07-03 16:51:44', '2023-10-03 16:51:44', 4),
(110.5, '7987', 55, '2023-07-28 14:38:48', '2023-10-09 14:38:48', 2),
(120.5, '8284', 60, '2023-07-28 16:51:44', '2023-10-03 16:51:44', 1),
(130.3, '8284', 67, '2023-07-17 16:51:44', '2023-10-03 16:51:44', 3),
(150.7, '8284', 78, '2023-07-28 16:51:44', '2023-10-03 16:51:44', 3),
(110.5, '7987', 55, '2023-08-28 16:51:44', '2023-10-03 16:51:44', 1),
(100.5, '7584', 50, '2023-07-03 16:51:44', '2023-10-03 16:51:44', 5),
(75.2, '6178', 35, '2023-07-03 16:51:44', '2023-10-03 16:51:44', 7),
(120.8, '8481', 60, '2023-07-28 16:51:44', '2023-10-03 16:51:44', 5),
(90.3, '7122', 45, '2023-07-28 16:51:44', '2023-10-03 16:51:44', 7);

INSERT INTO Factura (NumeroMedidor, ConsumoFinal, LecturaFinal, CostoTotal, FechaRegistro, FechaActualizacion, IdMedidor) VALUES 
('0N1DQI45', 120.5, '8284', 60, '2023-07-28 16:51:44', '2023-10-03 16:51:44', 1),
('D7291D13', 110.5, '7987', 55, '2023-07-28 14:38:48', '2023-10-09 14:38:48', 2),
('Y12FG01J', 150.7, '8284', 78, '2023-07-28 16:51:44', '2023-10-03 16:51:44', 3),
('CN12237F', 90.3, '7122', 45, '2023-07-03 16:51:44', '2023-10-03 16:51:44', 4),
('0N1DQI45', 110.5, '7987', 55, '2023-08-28 16:51:44', '2023-10-03 16:51:44', 1);

-- Insertar con Actualizar

DELIMITER //

CREATE TRIGGER Insertar_Datos_Consumo
AFTER INSERT ON Consumo
FOR EACH ROW
BEGIN
    DECLARE numRegistros INT;
	DECLARE numeroMedidorConsumo VARCHAR(255);

    -- Obtener el NumeroMedidor correspondiente al IdMedidor de la tabla Consumo
    SELECT NumeroMedidor INTO numeroMedidorConsumo
    FROM Medidor
    WHERE Id = NEW.IdMedidor;
    
    -- Verificar si ya existe un registro en Factura con el mismo mes e IdMedidor
    SELECT COUNT(*)
    INTO numRegistros
    FROM Factura
    WHERE MONTH(Factura.FechaRegistro) = MONTH(NEW.FechaRegistro)
        AND YEAR(Factura.FechaRegistro) = YEAR(NEW.FechaRegistro)
        AND Factura.IdMedidor = NEW.IdMedidor;

    -- Actualizar o insertar en Factura según el resultado de la verificación
    IF numRegistros = 0 THEN
        -- No hay registros, insertar uno nuevo
        INSERT INTO Factura (NumeroMedidor, ConsumoFinal, LecturaFinal, CostoTotal, IdMedidor)
        VALUES (numeroMedidorConsumo, NEW.Consumo, NEW.Lectura, NEW.Costo, NEW.IdMedidor);
    ELSE
        -- Ya existe un registro, actualizar el existente
        UPDATE Factura
        SET NumeroMedidor = numeroMedidorConsumo,
            ConsumoFinal = NEW.Consumo,
            LecturaFinal = NEW.Lectura,
            CostoTotal = NEW.Costo
        WHERE MONTH(Factura.FechaRegistro) = MONTH(NEW.FechaRegistro)
            AND YEAR(Factura.FechaRegistro) = YEAR(NEW.FechaRegistro)
            AND Factura.IdMedidor = NEW.IdMedidor;
    END IF;
END;
//

DELIMITER ;

-- Calcular Costo

DELIMITER //
CREATE TRIGGER Calcular_Costo
BEFORE INSERT ON Consumo
FOR EACH ROW
BEGIN
    SET NEW.Costo = NEW.Consumo * 0.6;
END;
//
DELIMITER ;

-- Actualizar tarifa en Factura

DELIMITER //

CREATE TRIGGER Actualizar_Tarifa_Consumo
AFTER UPDATE ON Consumo
FOR EACH ROW
BEGIN
    DECLARE numRegistros INT;
	DECLARE numeroMedidorConsumo VARCHAR(255);

    -- Obtener el NumeroMedidor correspondiente al IdMedidor de la tabla Consumo
    SELECT NumeroMedidor INTO numeroMedidorConsumo
    FROM Medidor
    WHERE Id = NEW.IdMedidor;
    
    -- Verificar si ya existe un registro en Factura con el mismo mes e IdMedidor
    SELECT COUNT(*)
    INTO numRegistros
    FROM Factura
    WHERE MONTH(Factura.FechaRegistro) = MONTH(NEW.FechaRegistro)
        AND YEAR(Factura.FechaRegistro) = YEAR(NEW.FechaRegistro)
        AND Factura.IdMedidor = NEW.IdMedidor;

        -- Ya existe un registro, actualizar el existente
        UPDATE Factura
        SET NumeroMedidor = numeroMedidorConsumo,
            ConsumoFinal = NEW.Consumo,
            LecturaFinal = NEW.Lectura,
            CostoTotal = NEW.Costo
        WHERE MONTH(Factura.FechaRegistro) = MONTH(NEW.FechaRegistro)
            AND YEAR(Factura.FechaRegistro) = YEAR(NEW.FechaRegistro)
            AND Factura.IdMedidor = NEW.IdMedidor;
END;
//

DELIMITER ;
```
- **API / servicios Web**

   Despliegue de la API en un servidor compatible con aplicaciones ASP.NET, en este caso, Somee. 
Subida de la aplicación mediante el FileManager del hosting para facilitar el consumo de la API. 
Creación de la base de datos denominada "ElfecDB" y ejecución del script de la tabla "User" con sus datos correspondientes. 
Script: 

**Credenciales Hosting:**

- Username:	GPTesis 
- Password:	1\1\WO23ao4?7Uc< 

**Credenciales BD:** 

- SQL Server address:	ElfecDB.mssql.somee.com 
- Login name:		GPTesis_SQLLogin_1 
- Login Password: 	zhr7t8ety5

## GIT
- Versión final entregada del proyecto.

  Enlace: [JDonaireF/PRIII-LORA](https://github.com/JDonaireF/PRIII-LORA/)

- Entrega compilados ejecutables

  Drive: [Build - LORA](https://drive.google.com/file/d/1PjCUr4LlAfcrhUFgYWhTr50Ds0_4_kxQ/view)

## Personalización y configuración

   El supervisor cuenta con la capacidad de ajustar la tarifa de consumo de los medidores respectivos al acceder al historial de consumo. Asimismo, tiene la facultad de habilitar y deshabilitar dichos dispositivos según sea necesario.

## Seguridad 

   Consideraciones de seguridad: Permisos de acceso, y autenticación de usuarios.

   Recomendaciones para prácticas de seguridad: Gestión adecuada de credenciales.

## Depuración y solución de problemas 
- **Identificación de Problemas Comunes**
  - **Errores de Consola:** Revise la consola del navegador para identificar mensajes de error o advertencias. Esto puede proporcionar pistas sobre posibles problemas en el lado del cliente.

- **Solución de Problemas y Mensajes de Error:**

  - **Errores de Construcción:** Si encuentra problemas durante la construcción (por ejemplo, al ejecutar npm run build), verifique las dependencias y asegúrese de tener las versiones correctas de   Node.js y npm.
  - **Problemas de Rutas:** Si la aplicación no se carga correctamente, verifique las rutas en la configuración de Next.js y asegúrese de que coincidan con la estructura de archivos y carpetas.
  - **Errores de API:** Si la aplicación depende de servicios externos o APIs, asegúrese de que la conexión sea exitosa y maneje posibles errores de respuesta.
## Glosario de términos 

- **Next.js:** Un framework de desarrollo web de React.js que permite construir aplicaciones web modernas con renderización del lado del servidor y otras características avanzadas.
- **B.D:** Un sistema organizado para recopilar, almacenar y gestionar datos, generalmente accesible mediante consultas.
- **MySQL:** Sistema de gestión de bases de datos utilizado en el proyecto para almacenar información crítica sobre medidores, consumo y facturas.
- **API REST:** Interfaz de programación de aplicaciones basada en HTTP que sigue los principios de REST (Transferencia de Estado Representacional) para facilitar la comunicación entre sistemas.
- **NPM:** Herramienta utilizada para gestionar las dependencias del proyecto, facilitando la instalación y actualización de paquetes de software.
- **QA Tester:** Persona encargada de realizar pruebas de calidad para identificar y corregir posibles problemas en el software.
- **MVC:** Patrón de diseño de software que separa la lógica de la aplicación en tres componentes principales: modelo, vista y controlador.
- **MQTT:** Protocolo de mensajería para la comunicación entre dispositivos, utilizado en la simulación del proyecto para la transferencia de datos.
- **PWA:** Aplicación web que utiliza tecnologías modernas para proporcionar una experiencia similar a la de una aplicación nativa, incluyendo la capacidad de trabajar sin conexión.
- **Middleware:** Software que actúa como intermediario entre diferentes aplicaciones, permitiendo la comunicación y la gestión de datos entre ellas.
- **Git:** Un sistema de control de versiones distribuido utilizado para el seguimiento de cambios en el código fuente durante el desarrollo de software.
- **Hosting:** Servicio que permite a los usuarios publicar su aplicación o sitio web en Internet, haciéndolo accesible a otros usuarios.
- **Scripts:** Conjunto de comandos o instrucciones.
- **Root:** Usuario con privilegios máximos en una base de datos, con control total sobre la misma.
## Referencias y recursos adicionales 

   [Next.js](https://nextjs.org/docs)

   [Flowbite](https://flowbite.com/docs/getting-started/introduction/)

   [ChartJS](https://react-chartjs-2.js.org/)

   [Next-Auth](https://next-auth.js.org/getting-started/introduction)

   [Next-Pwa](https://www.npmjs.com/package/next-pwa)

## Herramientas de Implementación
- Lenguajes de programación:

  C#, JS, JSX

- Frameworks:

  Next.js

  Entity Framework

- APIs de terceros.


# DOCKER Y VIDEO
Docker: https://univalleedu.sharepoint.com/:u:/s/PRIII-LORA/EVC8DqfYeodMo3CB4pRbcHABJR33wb5upwjhfPb3QhvOSg?e=y4c28A

Video: https://youtu.be/ZL7FDv_ryt0
