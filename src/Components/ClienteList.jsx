import React, { useState } from 'react';
import LogoImage from '../images/LogoBCP1.png';
import Formulario from './ClienteForm';
import axios from 'axios';
import { Button } from '@chakra-ui/react';
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
} from '@chakra-ui/react';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  const handleSaveClient = async (clienteData, cuentasData) => {
    try {
      // Aquí debes asegurarte de que los datos que llegan están en el formato correcto antes de manipularlos
      const newClient = {
        documento: clienteData.documento,
        nombres: clienteData.nombres,
        paterno: clienteData.paterno,
        materno: clienteData.materno,
      };

      const newAccounts = cuentasData.map(cuenta => ({
        tipoCuenta: cuenta.tipoCuenta,
        tipoMoneda: cuenta.tipoMoneda,
        sucursal: cuenta.sucursal,
      }));

      // Realizar la solicitud para guardar el cliente
      const responseCliente = await axios.post('https://localhost:7124/api/Clientes', newClient);

      // Si la solicitud del cliente se completó con éxito, guardar las cuentas
      const clienteId = responseCliente.data.id;

      const cuentasConIdCliente = newAccounts.map(cuenta => ({
        ...cuenta,
        clienteId: clienteId,
      }));

      // Realizar la solicitud para guardar las cuentas asociadas al cliente
      const responseCuentas = await axios.post('https://localhost:7124/api/Cuentas', cuentasConIdCliente);

      // Manejar la respuesta si es necesario
      console.log('Cliente guardado:', responseCliente.data);
      console.log('Cuentas guardadas:', responseCuentas.data);

      // Actualizar el estado de clients si es necesario
      setClients(prevClients => [...prevClients, responseCliente.data]);
    } catch (error) {
      // Manejar errores en caso de que la solicitud falle
      console.error('Error al guardar el cliente o cuentas:', error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Center py="4">
      <div style={{ overflowX: 'auto' }}>
        {/* Logo alineado a la izquierda */}
        {/* Renderizar el componente Formulario y pasar la función handleSaveClient */}
        <Formulario isOpen={isOpen} onClose={handleClose} onSave={handleSaveClient} />
        
        <h1>Lista de Clientes</h1>

        <Button onClick={handleOpen}>Abrir Formulario</Button>
        
        <Center>
          <Table variant="simple" size="sm" mt="4" overflowX="auto">
            <Thead bg="blue.200">
              <Tr>
                <Th borderBottom="2px" borderColor="blue.500">Documento</Th>
                <Th borderBottom="2px" borderColor="blue.500">Nombres</Th>
                <Th borderBottom="2px" borderColor="blue.500">Apellido Paterno</Th>
                <Th borderBottom="2px" borderColor="blue.500">Apellido Materno</Th>
                <Th borderBottom="2px" borderColor="blue.500">Tipo Cuenta</Th>
                <Th borderBottom="2px" borderColor="blue.500">Tipo Moneda</Th>
                <Th borderBottom="2px" borderColor="blue.500">Sucursal</Th>
              </Tr>
            </Thead>
            <Tbody>
              {clients.map((client, index) => (
                <Tr key={index}>
                  <Td>{client.documento}</Td>
                  <Td>{client.nombres}</Td>
                  <Td>{client.paterno}</Td>
                  <Td>{client.materno}</Td>
                  <Td>
                    {client.cuentas.map((cuenta, idx) => (
                      <chakra.span key={idx}>{cuenta.tipoCuenta}, </chakra.span>
                    ))}
                  </Td>
                  <Td>
                    {client.cuentas.map((cuenta, idx) => (
                      <chakra.span key={idx}>{cuenta.tipoMoneda}, </chakra.span>
                    ))}
                  </Td>
                  <Td>
                    {client.cuentas.map((cuenta, idx) => (
                      <chakra.span key={idx}>{cuenta.sucursal}, </chakra.span>
                    ))}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Center>
      </div>
    </Center>
  );
};

export default ClientList;
