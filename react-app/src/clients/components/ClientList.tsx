import { useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import { useClientProvider } from '../providers/useClientProvider';
import { ClientCard } from './ClientCard';
import { CreateClientModal } from './CreateClientModal';

export function ClientList() {
  const { clients, loading, loadClients, createClient, updateClient, deleteClient } =
    useClientProvider();

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  if (loading && clients.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <CreateClientModal onCreate={createClient} />
      </div>

      <Row gutter={[16, 16]}>
        {clients.map((client) => (
          <Col key={client.id} xs={24} sm={12} md={8} lg={6} xl={4.8}>
            <ClientCard
              client={client}
              onDelete={deleteClient}
              onUpdate={updateClient}
            />
          </Col>
        ))}
      </Row>

      {clients.length === 0 && !loading && (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#999',
            fontSize: 16,
          }}
        >
          No clients found. Create your first client!
        </div>
      )}
    </div>
  );
}