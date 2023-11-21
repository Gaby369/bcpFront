import React, { useState } from 'react';
import LogoImage from '../images/LogoBCP1.png';
import Formulario from './ClienteForm';
import {
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Image,
  Box,
} from '@chakra-ui/react';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  const handleSaveClient = (clienteData, cuentasData) => {
    // ... (resto de tu lógica)
  };

  return (
    <Box bg="blue.200" py="2">
      {/* Logo en el encabezado */}
      <Center>
        <Image src={LogoImage} alt="Logo" boxSize="100px" />
      </Center>

      {/* Renderiza el componente Formulario y pasa la función handleSaveClient */}
      <Formulario onSave={handleSaveClient} />
      
      {/* Mostrar la lista de clientes */}
      <Center mt="4">
        <Table variant="simple" size="sm" overflowX="auto">
          {/* ... (resto de tu tabla y lógica para mostrar los clientes) */}
        </Table>
      </Center>
    </Box>
  );
};

export default ClientList;
