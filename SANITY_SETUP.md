# 🔧 Pasos finales para activar Sanity

## ⚠️ IMPORTANTE: Dar acceso al proyecto

El proyecto Sanity está creado, pero necesito acceso para configurarlo completamente.

### Opción 1: El cliente me da acceso (RECOMENDADO)

1. El cliente entra a: https://www.sanity.io/manage
2. Selecciona el proyecto "Rantti"
3. Va a "Members" (Miembros)
4. Hace clic en "Invite member"
5. Agrega mi email y me da rol de "Administrator"

### Opción 2: Ejecutar comando desde la cuenta del cliente

Si el cliente tiene acceso local, puede ejecutar:

```bash
npx sanity login
# Luego iniciar sesión con su cuenta

npx sanity init --project-id 8mwvnyj6 --dataset production
```

## 📝 Crear el primer documento

Una vez configurado, el cliente debe:

1. Ir a `http://localhost:3000/studio` o ejecutar `npm run sanity`
2. Hacer clic en "Página de Inicio" en el menú lateral
3. Hacer clic en "Create"
4. **COPIAR y PEGAR** los datos del archivo `sanity/lib/initialData.ts`
5. Hacer clic en "Publish"

## ✅ Verificar que funcione

1. Los cambios deberían aparecer en el sitio
2. Cualquier edición futura se actualiza automáticamente

## 🆘 Si hay problemas

- Verificar que las credenciales en `.env.local` sean correctas
- Asegurarse de estar logueado en Sanity
- Reiniciar el servidor de desarrollo (`npm run dev`)
