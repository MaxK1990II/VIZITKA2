export default function NotFound() {
  return (
    <html lang="ru">
      <body style={{
        margin: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        color: '#f5f5f5',
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Страница не найдена</h1>
          <p style={{ opacity: 0.7 }}>Перейдите на главную страницу.</p>
        </div>
      </body>
    </html>
  );
}


