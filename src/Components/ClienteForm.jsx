import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  VStack,
  Select,
} from '@chakra-ui/react';

export const Formulario = ({ isOpen, onClose, onSave  }) => {
  const [showAccountFields, setShowAccountFields] = useState(false);
  const [clienteData, setClienteData] = useState({
    documento: 0, // Tipo: entero
    nombres: '', // Tipo: Cadena
    paterno: '', // Tipo: Cadena
    materno: '', // Tipo: Cadena
    fechaNacimiento: '', // Tipo: Fecha
    estadoCivil: '', // Tipo: Selección
    domicilio: '', // Tipo: Cadena
    nacionalidad: '', // Tipo: Selección
  });
  const [cuentasData, setCuentasData] = useState([]);

  const handleClienteChange = (e) => {
    const { name, value } = e.target;
  
    // Validación para el campo 'documento' del cliente (entero)
    if (name === 'documento' && isNaN(Number(value))) {
      return; // Si no es un número, no actualiza el estado
    }
  
    setClienteData({
      ...clienteData,
      [name]: value,
    });
  };
  
  const handleCuentaChange = (e, index) => {
    const updatedCuentas = [...cuentasData];
    const { name, value } = e.target;
  
    // Validaciones para campos específicos en cuentasData
  
    // Por ejemplo, si 'documento' en cuentasData debe ser numérico:
    if (name === 'documento' && isNaN(Number(value))) {
      return; // No actualiza el estado si no es un número
    }
  
    updatedCuentas[index] = {
      ...updatedCuentas[index],
      [name]: value,
    };
    setCuentasData(updatedCuentas);
  };
  

  const handleAddAccount = () => {
    setShowAccountFields(true);
    setCuentasData([
      ...cuentasData,
      {
        documento: '',
        nombreCuenta: '',
        tipoCuenta: '',
        tipoMoneda: '',
        sucursal: '',
      },
    ]);
  };

  const handleRemoveAccount = (index) => {
    const updatedCuentas = [...cuentasData];
    updatedCuentas.splice(index, 1);
    setCuentasData(updatedCuentas);
  };

  const handleSave = (clienteData, cuentasData) => {
    console.log('Datos del cliente:', clienteData);
    console.log('Datos de las cuentas:', cuentasData);
    onClose();
  
    // Llamando a la función onSave para enviar los datos al componente padre
    onSave(clienteData, cuentasData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Formulario de Cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Documento</FormLabel>
                <Input
                  placeholder="Documento"
                  name="documento"
                  value={clienteData.documento}
                  onChange={handleClienteChange}
                />
              </FormControl>
              <FormControl>
              <FormLabel>Apellido Paterno</FormLabel>
              <Input
                placeholder="Apellido Paterno"
                name="paterno"
                value={clienteData.paterno}
                onChange={handleClienteChange}
              />
            </FormControl>
            <FormControl >
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <Input
                type="date"
                value={clienteData.fechaNacimiento}
                onChange={(e) => handleClienteChange(e)}
                name="fechaNacimiento"
                />
            </FormControl>
            <FormControl>
            <FormLabel>Domicilio</FormLabel>
            <Input
                placeholder="Domicilio"
                value={clienteData.domicilio}
                onChange={(e) => handleClienteChange(e, 'domicilio')}
                name="domicilio"
            />
            </FormControl>

              {/* ... Otros campos del cliente ... */}
            </GridItem>
            <GridItem colSpan={1}>
            <FormControl>
                <FormLabel>Nombres</FormLabel>
                <Input
                  placeholder="Nombres"
                  name="nombres"
                  value={clienteData.nombres}
                  onChange={handleClienteChange}
                />
              </FormControl>
              <FormControl>
              <FormLabel>Apellido Materno</FormLabel>
              <Input
                placeholder="Apellido Materno"
                name="materno"
                value={clienteData.materno}
                onChange={handleClienteChange}
              />
            </FormControl>
            <FormControl>
            <FormLabel>Estado Civil</FormLabel>
            <Select
            placeholder="Seleccionar Estado Civil"
            value={clienteData.estadoCivil}
            onChange={(e) => handleClienteChange(e)}
            name="estadoCivil"
            >
            <option value="soltero">Soltero</option>
            <option value="casado">Casado</option>
            <option value="conviviente">Conviviente</option>
            </Select>

            </FormControl>
            <FormControl>
                <FormLabel>Nacionalidad</FormLabel>
                <Select
                    placeholder="Seleccionar Nacionalidad"
                    value={clienteData.nacionalidad}
                    onChange={(e) => handleClienteChange(e)}
                    name="nacionalidad"
                    >
                    <option value="bolivia">Bolivia</option>
                    <option value="argentina">Argentina</option>
                    <option value="peru">Perú</option>
                    <option value="brasil">Brasil</option>
                    <option value="ecuador">Ecuador</option>
                    <option value="chile">Chile</option>
                    <option value="uruguay">Uruguay</option>
                    <option value="colombia">Colombia</option>
                    </Select>

            </FormControl>
            </GridItem>
          </Grid>
          <Button onClick={handleAddAccount}>+ Agregar Cuenta</Button>
          {showAccountFields && (
            <VStack spacing={4} align="stretch">
              {cuentasData.map((cuenta, index) => (
                <Grid key={index} templateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl>
                    <FormLabel>Documento</FormLabel>
                    <Input
                      placeholder="Documento"
                      name="documento"
                      value={cuenta.documento}
                      onChange={(e) => handleCuentaChange(e, index)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Nombre Cuenta</FormLabel>
                    <Input
                      placeholder="Nombre Cuenta"
                      name="nombreCuenta"
                      value={cuenta.nombreCuenta}
                      onChange={(e) => handleCuentaChange(e, index)}
                    />
                  </FormControl>

                  <FormControl>
                <FormLabel>Tipo Cuenta</FormLabel>
                <Select
                    placeholder="Seleccionar Tipo Cuenta"
                    name="tipoCuenta"
                    value={cuenta.tipoCuenta}
                    onChange={(e) => handleCuentaChange(e, index)}
                >
                    <option value="AHORRO">AHORRO</option>
                    <option value="CORRIENTE">CORRIENTE</option>
                </Select>
                </FormControl>

                <FormControl>
                <FormLabel>Tipo Moneda</FormLabel>
                <Select
                    placeholder="Seleccionar Tipo Moneda"
                    name="tipoMoneda"
                    value={cuenta.tipoMoneda}
                    onChange={(e) => handleCuentaChange(e, index)}
                >
                    <option value="BOLIVIANOS">BOLIVIANOS</option>
                    <option value="DOLARES">DOLARES</option>
                </Select>
                </FormControl>

                <FormControl>
                <FormLabel>Sucursal</FormLabel>
                <Select
                    placeholder="Seleccionar Sucursal"
                    name="sucursal"
                    value={cuenta.sucursal}
                    onChange={(e) => handleCuentaChange(e, index)}
                >
                    <option value="CHUQUISACA">CHUQUISACA</option>
                    <option value="LA PAZ">LA PAZ</option>
                    <option value="COCHABAMBA">COCHABAMBA</option>
                    <option value="ORURO">ORURO</option>
                    <option value="POTOSI">POTOSI</option>
                    <option value="TARIZA">TARIZA</option>
                    <option value="SANTA CRUZ">SANTA CRUZ</option>
                    <option value="BENI">BENI</option>
                    <option value="PANDO">PANDO</option>
                </Select>
                </FormControl>

                  <Button onClick={() => handleRemoveAccount(index)}>Eliminar</Button>
                </Grid>
              ))}
            </VStack>
          )}
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="solid" colorScheme="teal" onClick={handleSave}>
          
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Formulario;
