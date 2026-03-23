# 🔐 PREGUNTAS PARA BACKEND - Expiración de Tokens

## 📋 Contexto
El **frontend YA NO controla** la expiración por tiempo absoluto. Solo detecta inactividad del usuario (opcional, para UX).

El **BACKEND debe** ser el único responsable de:
- Emitir tokens
- Validar tokens
- **Destruir/invalidar tokens** cuando expiren

---

## ❓ Preguntas para el Desarrollador Backend

### 1. ¿Laravel Sanctum tiene configurado un tiempo de expiración para los tokens?

**Verificar en:** `config/sanctum.php`

```php
// ¿Está configurado esto?
'expiration' => 60, // minutos
```

**Pregunta:** ¿Cuánto tiempo dura un token antes de expirar?

---

### 2. ¿El backend DESTRUYE el token cuando expira?

**Actualmente:**
- Cuando el token expira, ¿se elimina automáticamente de la base de datos?
- ¿O solo se marca como inválido pero sigue existiendo?

**Lo que debería pasar:**
Cuando un token expira, el backend debe:
```php
// Ejemplo en logout o expiración automática
$user->tokens()->delete();
```

---

### 3. ¿El backend valida la expiración en cada petición autenticada?

**Verificar:**
- ¿Sanctum valida automáticamente si el token expiró?
- ¿Devuelve un error `401 Unauthorized` cuando el token ya expiró?
- ¿Devuelve el código `UNAUTHENTICATED` correctamente?

---

### 4. ¿Hay algún CRON job o task que limpia tokens expirados?

**Recomendación:**
Laravel debería tener un comando programado que limpie tokens viejos:

```php
// En app/Console/Kernel.php
protected function schedule(Schedule $schedule)
{
    // Limpiar tokens expirados cada día
    $schedule->command('sanctum:prune-expired --hours=24')->daily();
}
```

**Pregunta:** ¿Está implementado esto?

---

## ✅ Configuración Recomendada para Backend

### En `config/sanctum.php`:

```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Stateful Domains
    |--------------------------------------------------------------------------
    */
    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s%s',
        'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1',
        env('APP_URL') ? ','.parse_url(env('APP_URL'), PHP_URL_HOST) : ''
    ))),

    /*
    |--------------------------------------------------------------------------
    | Expiration Minutes
    |--------------------------------------------------------------------------
    |
    | Esto controla cuánto tiempo dura un token antes de expirar.
    | NULL = nunca expira (NO RECOMENDADO)
    | Número = minutos hasta expiración
    |
    */
    'expiration' => 480, // 8 horas (ejemplo)

    /*
    |--------------------------------------------------------------------------
    | Sanctum Middleware
    |--------------------------------------------------------------------------
    */
    'middleware' => [
        'verify_csrf_token' => App\Http\Middleware\VerifyCsrfToken::class,
        'encrypt_cookies' => App\Http\Middleware\EncryptCookies::class,
    ],
];
```

### Comando de limpieza (ejecutar en producción):

```bash
# Agregar a crontab o Task Scheduler
php artisan sanctum:prune-expired --hours=24
```

---

## 🎯 Resultado Esperado

### Frontend:
- ✅ Hace peticiones normalmente
- ✅ Si el backend responde `401/UNAUTHENTICATED`, muestra login
- ✅ Detecta inactividad (opcional) y puede cerrar sesión por UX

### Backend:
- ✅ Emite tokens con tiempo de expiración configurado
- ✅ Valida tokens en cada petición
- ✅ Devuelve `401 Unauthorized` cuando el token expiró
- ✅ Destruye tokens al hacer logout
- ✅ Limpia tokens expirados periódicamente

---

## 🚨 IMPORTANTE

**El frontend NO puede ni debe:**
- ❌ Decidir cuándo expira un token
- ❌ Contar tiempo desde el login y forzar logout
- ❌ Asumir que un token es válido solo por tener uno guardado

**El frontend SOLO debe:**
- ✅ Enviar el token en cada petición
- ✅ Respetar lo que diga el backend (200 OK = válido, 401 = inválido)
- ✅ Opcionalmente detectar inactividad del usuario (para UX)

---

## 📝 Siguiente Paso

**Compartir este documento con el desarrollador del backend** para que:
1. Verifique la configuración actual
2. Implemente la expiración correcta de tokens
3. Confirme que está limpiando tokens expirados

Una vez confirmado, el problema de "sesión cerrada mientras trabajas" **desaparecerá**.
