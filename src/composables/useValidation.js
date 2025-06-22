import { useForm } from 'vee-validate'
import * as yup from 'yup'

export function useUserValidation(initialValues = {}) {
  // Validation schema
  const schema = yup.object({
    // CAMPOS OBLIGATORIOS (requeridos por el ejercicio)
    name: yup
      .string()
      .required('El nombre es obligatorio')
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(50, 'El nombre no puede tener más de 50 caracteres'),
    
    username: yup
      .string()
      .required('El nombre de usuario es obligatorio')
      .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
      .max(20, 'El nombre de usuario no puede tener más de 20 caracteres')
      .matches(/^[a-zA-Z0-9_]+$/, 'El nombre de usuario solo puede contener letras, números y guiones bajos'),
    
    email: yup
      .string()
      .required('El email es obligatorio')
      .email('Debe ser un email válido'),
    
    phone: yup
      .string()
      .required('El teléfono es obligatorio')
      .matches(/^[\d\s\-\+\(\)\.]+$/, 'Formato de teléfono inválido'),
    
    // CAMPOS OPCIONALES (para compatibilidad con API)
    website: yup
      .string()
      .url('Debe ser una URL válida')
      .nullable()
      .optional(),
    
    address: yup.object({
      street: yup
        .string()
        .nullable()
        .optional(),
      
      suite: yup
        .string()
        .nullable()
        .optional(),
      
      city: yup
        .string()
        .nullable()
        .optional(),
      
      zipcode: yup
        .string()
        .nullable()
        .optional(),
      
geo: yup.object({
        lat: yup
          .string()
          .nullable()
          .optional(),
        
        lng: yup
          .string()
          .nullable()
          .optional()
      }).nullable().optional()
    }).nullable().optional(),
    
    company: yup.object({
      name: yup
        .string()
        .nullable()
        .optional(),
      
      catchPhrase: yup
        .string()
        .nullable()
        .optional(),
      
      bs: yup
        .string()
        .nullable()
        .optional()
    }).nullable().optional()
  })

  // Default values
  const defaultValues = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    },
    ...initialValues
  }

  // Use VeeValidate
  const {
    values,
    errors,
    defineField,
    handleSubmit,
    resetForm,
    setFieldValue,
    setValues,
    validate,
    meta
  } = useForm({
    validationSchema: schema,
    initialValues: defaultValues
  })

  // Define fields
  const [name, nameAttrs] = defineField('name')
  const [username, usernameAttrs] = defineField('username')
  const [email, emailAttrs] = defineField('email')
  const [phone, phoneAttrs] = defineField('phone')
  const [website, websiteAttrs] = defineField('website')
  
  // Address fields
  const [addressStreet, addressStreetAttrs] = defineField('address.street')
  const [addressSuite, addressSuiteAttrs] = defineField('address.suite')
  const [addressCity, addressCityAttrs] = defineField('address.city')
  const [addressZipcode, addressZipcodeAttrs] = defineField('address.zipcode')
  
  // Company fields
  const [companyName, companyNameAttrs] = defineField('company.name')
  const [companyCatchPhrase, companyCatchPhraseAttrs] = defineField('company.catchPhrase')
  const [companyBs, companyBsAttrs] = defineField('company.bs')

  // Custom validation functions
  const validateField = async (fieldName) => {
    const result = await validate(fieldName)
    return result.valid
  }

  const hasErrors = (fieldName) => {
    return !!errors.value[fieldName]
  }

  const getFieldError = (fieldName) => {
    return errors.value[fieldName]
  }

  const isFormValid = () => {
    return meta.value.valid
  }

  const isFormDirty = () => {
    return meta.value.dirty
  }

  // Validar solo campos obligatorios (requeridos por el ejercicio)
  const areRequiredFieldsValid = () => {
    const requiredFields = ['name', 'username', 'email', 'phone']
    return requiredFields.every(field => {
      const value = values[field]
      const hasError = errors.value[field]
      const isValid = value && value.trim() !== '' && !hasError
      return isValid
    })
  }

  // Reset form to initial or provided values
  const resetToInitial = (newValues = defaultValues) => {
    resetForm({
      values: newValues
    })
  }

  return {
    // Form state
    values,
    errors,
    meta,
    
    // Field bindings
    fields: {
      name: [name, nameAttrs],
      username: [username, usernameAttrs],
      email: [email, emailAttrs],
      phone: [phone, phoneAttrs],
      website: [website, websiteAttrs],
      addressStreet: [addressStreet, addressStreetAttrs],
      addressSuite: [addressSuite, addressSuiteAttrs],
      addressCity: [addressCity, addressCityAttrs],
      addressZipcode: [addressZipcode, addressZipcodeAttrs],
      companyName: [companyName, companyNameAttrs],
      companyCatchPhrase: [companyCatchPhrase, companyCatchPhraseAttrs],
      companyBs: [companyBs, companyBsAttrs]
    },
    
    // Methods
    handleSubmit,
    setFieldValue,
    setValues,
    validate,
    validateField,
    resetForm,
    resetToInitial,
    hasErrors,
    getFieldError,
    isFormValid,
    isFormDirty,
    areRequiredFieldsValid
  }
}