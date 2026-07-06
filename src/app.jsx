import React, { useState } from 'react';
import { ChevronLeft, Plus, Edit2, Trash2, Check, X } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('home'); // home, detail, admin
  const [selectedItem, setSelectedItem] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  const [items, setItems] = useState([
    { 
      id: 1, 
      type: 'benefit',
      category: 'Health', 
      title: 'Medical Insurance', 
      description: 'Coverage for you and your family',
      details: 'Comprehensive medical insurance coverage for you and your dependents. Includes annual checkups, emergency care, and prescription medications under a Phoenix Insurance policy.',
      color: '#1d5e3f'
    },
    { 
      id: 2, 
      type: 'benefit',
      category: 'Health', 
      title: 'Dental Plan', 
      description: 'Annual dental checkups and procedures',
      details: 'Annual dental checkups and basic procedures covered. Includes cleanings, fillings, and root canals up to 80% coverage.',
      color: '#2d1b4e'
    },
    { 
      id: 3, 
      type: 'benefit',
      category: 'Time Off', 
      title: 'Time Off & Leave', 
      description: 'Time to rest & recharge',
      details: '20 days of paid vacation annually. Plus flexible work arrangements and mental health days.',
      color: '#3d2033'
    },
    { 
      id: 4, 
      type: 'benefit',
      category: 'Perks', 
      title: 'Maternity & Paternity', 
      description: 'Expanding your family',
      details: 'Up to 4 months paid parental leave. Flexible return-to-work options and childcare support.',
      color: '#4a1f3f'
    },
    { 
      id: 5, 
      type: 'benefit',
      category: 'Perks', 
      title: '₪350 Monthly Wellness', 
      description: 'Monthly allowance for health & wellness',
      details: 'Monthly allowance to invest in your health and wellness. Use for gym, yoga, meditation apps, or wellness equipment.',
      color: '#4a1f3f'
    },
    { 
      id: 6, 
      type: 'benefit',
      category: 'Perks', 
      title: '₪1000 Monthly Food', 
      description: 'Daily food & dining coverage',
      details: 'Daily food and dining covered via Cibus. Order lunch or dinner to your office or home.',
      color: '#4a1f3f'
    },
    { 
      id: 7, 
      type: 'policy',
      category: 'Global',
      title: 'Global Relocation Policy', 
      description: 'Support for employees relocating',
      details: 'Support and guidelines for employees relocating globally. Includes visa assistance, accommodation support, and relocation allowance.',
      color: '#3f2033'
    },
    { 
      id: 8, 
      type: 'policy',
      category: 'Travel',
      title: 'Travel Policy', 
      description: 'Rules and reimbursements for business travel',
      details: 'Rules and reimbursements for business travel. Economy flights, hotel reimbursement up to ₪400/night.',
      color: '#3f2033'
    },
    { 
      id: 9, 
      type: 'policy',
      category: 'Expenses',
      title: 'Expense Reporting Policy', 
      description: 'How to report work-related expenses',
      details: 'How to report and get reimbursed for work-related expenses. Submit within 30 days with receipts.',
      color: '#5c3a1f'
    },
  ]);

  const [newItem, setNewItem] = useState({ type: 'benefit', category: '', title: '', description: '', details: '', color: '#3f2033' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleViewDetail = (item) => {
    setSelectedItem(item);
    setView('detail');
  };

  const handleAddItem = () => {
    if (newItem.category && newItem.title && newItem.description) {
      setItems([...items, { id: Date.now(), ...newItem }]);
      setNewItem({ type: 'benefit', category: '', title: '', description: '', details: '', color: '#3f2033' });
    }
  };

  const handleEditItem = (item) => {
    setEditingId(item.id);
    setEditData({ ...item });
  };

  const handleSaveEdit = () => {
    setItems(items.map(i => i.id === editingId ? editData : i));
    setEditingId(null);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleAdminAccess = () => {
    if (adminPassword === 'admin123') {
      setAdminMode(true);
      setAdminPassword('');
      setView('admin');
    } else {
      alert('Incorrect password');
    }
  };

  // ============ HOME VIEW ============
  if (view === 'home' && !adminMode) {
    const benefits = items.filter(i => i.type === 'benefit');
    const policies = items.filter(i => i.type === 'policy');

    return (
      <div style={{ minHeight: '100vh', background: '#0f1419', color: '#fff', padding: '2rem 1rem' }}>
        {/* Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '3rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 700, margin: 0, color: '#FEE000' }}>
              personetics
            </h1>
            <p style={{ fontSize: '14px', color: '#19bbee', margin: '0.5rem 0 0' }}>
              IL Benefits & Policies Hub
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 0.5rem', color: '#fff' }}>
              Welcome to your Benefits.
            </h2>
            <p style={{ fontSize: '16px', color: '#bbb', margin: 0 }}>
              You have {items.length} active benefits and policies available.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 1.5rem', color: '#fff' }}>
            Benefits
          </h3>
          <p style={{ fontSize: '14px', color: '#999', margin: '0 0 1.5rem' }}>
            Your personal wellbeing & rewards
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {benefits.map(item => (
              <div
                key={item.id}
                onClick={() => handleViewDetail(item)}
                style={{
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '12px',
                  padding: '24px',
                  cursor: 'pointer',
                  border: '1px solid rgba(254, 224, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#FEE000', letterSpacing: '1px' }}>
                    {item.category.toUpperCase()}
                  </span>
                  <div style={{ width: '40px', height: '3px', background: '#FEE000', margin: '8px 0' }} />
                  <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '12px 0 8px', color: '#fff' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                    {item.description}
                  </p>
                </div>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: '13px', color: '#FEE000', textDecoration: 'none', fontWeight: 600, marginTop: '12px' }}>
                  View details →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Policies Section */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 1.5rem', color: '#fff' }}>
            Policies
          </h3>
          <p style={{ fontSize: '14px', color: '#999', margin: '0 0 1.5rem' }}>
            Guidelines, handbooks & company policies
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {policies.map(item => (
              <div
                key={item.id}
                onClick={() => handleViewDetail(item)}
                style={{
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '12px',
                  padding: '24px',
                  cursor: 'pointer',
                  border: '1px solid rgba(254, 224, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#FEE000', letterSpacing: '1px' }}>
                    {item.category.toUpperCase()}
                  </span>
                  <div style={{ width: '40px', height: '3px', background: '#FEE000', margin: '8px 0' }} />
                  <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '12px 0 8px', color: '#fff' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                    {item.description}
                  </p>
                </div>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: '13px', color: '#FEE000', textDecoration: 'none', fontWeight: 600, marginTop: '12px' }}>
                  View details →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Button */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', marginTop: '3rem' }}>
          <button
            onClick={() => setView('admin-login')}
            style={{
              padding: '10px 16px',
              fontSize: '13px',
              background: 'transparent',
              border: '1px solid #FEE000',
              color: '#FEE000',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Admin Access
          </button>
        </div>
      </div>
    );
  }

  // ============ DETAIL VIEW ============
  if (view === 'detail' && selectedItem) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f1419', color: '#fff', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Back Button */}
          <button
            onClick={() => setView('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              border: 'none',
              color: '#FEE000',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '2rem'
            }}
          >
            <ChevronLeft size={18} />
            Back
          </button>

          {/* Detail Card */}
          <div style={{
            background: `linear-gradient(135deg, ${selectedItem.color} 0%, ${selectedItem.color}dd 100%)`,
            borderRadius: '12px',
            padding: '40px',
            border: '1px solid rgba(254, 224, 0, 0.3)'
          }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#FEE000', letterSpacing: '1px' }}>
              {selectedItem.category.toUpperCase()}
            </span>
            <div style={{ width: '60px', height: '4px', background: '#FEE000', margin: '12px 0 24px' }} />
            
            <h1 style={{ fontSize: '36px', fontWeight: 700, margin: '0 0 16px', color: '#fff' }}>
              {selectedItem.title}
            </h1>
            
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', margin: 0, lineHeight: '1.6' }}>
              {selectedItem.details}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============ ADMIN LOGIN ============
  if (view === 'admin-login') {
    return (
      <div style={{ minHeight: '100vh', background: '#0f1419', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ background: '#1a1f26', padding: '2rem', borderRadius: '12px', border: '1px solid #FEE000', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 1.5rem', color: '#FEE000' }}>
            Admin Access
          </h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdminAccess()}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '14px',
              border: '1px solid #FEE000',
              borderRadius: '6px',
              marginBottom: '1rem',
              boxSizing: 'border-box',
              background: '#0f1419',
              color: '#fff'
            }}
            autoFocus
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleAdminAccess}
              style={{
                flex: 1,
                padding: '10px',
                background: '#FEE000',
                color: '#1C0962',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              Access
            </button>
            <button
              onClick={() => setView('home')}
              style={{
                flex: 1,
                padding: '10px',
                background: 'transparent',
                color: '#FEE000',
                border: '1px solid #FEE000',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============ ADMIN VIEW ============
  if (view === 'admin' && adminMode) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f1419', color: '#fff', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 700, margin: 0, color: '#FEE000' }}>
              Admin Dashboard
            </h1>
            <button
              onClick={() => { setAdminMode(false); setView('home'); }}
              style={{
                padding: '8px 16px',
                background: 'transparent',
                border: '1px solid #FEE000',
                color: '#FEE000',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Logout
            </button>
          </div>

          {/* Add Item */}
          <div style={{ background: '#1a1f26', padding: '20px', borderRadius: '12px', border: '1px solid #FEE000', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 1rem', color: '#FEE000' }}>
              <Plus size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: '-2px' }} />
              Add New Item
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                style={{
                  padding: '8px',
                  border: '1px solid #FEE000',
                  borderRadius: '6px',
                  background: '#0f1419',
                  color: '#fff',
                  fontSize: '14px'
                }}
              >
                <option value="benefit">Benefit</option>
                <option value="policy">Policy</option>
              </select>
              <input
                type="text"
                placeholder="Category"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                style={{
                  padding: '8px',
                  border: '1px solid #FEE000',
                  borderRadius: '6px',
                  background: '#0f1419',
                  color: '#fff',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <input
                type="text"
                placeholder="Title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                style={{
                  padding: '8px',
                  border: '1px solid #FEE000',
                  borderRadius: '6px',
                  background: '#0f1419',
                  color: '#fff',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <input
                type="text"
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                style={{
                  padding: '8px',
                  border: '1px solid #FEE000',
                  borderRadius: '6px',
                  background: '#0f1419',
                  color: '#fff',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <textarea
                placeholder="Full Details"
                value={newItem.details}
                onChange={(e) => setNewItem({ ...newItem, details: e.target.value })}
                style={{
                  padding: '8px',
                  border: '1px solid #FEE000',
                  borderRadius: '6px',
                  background: '#0f1419',
                  color: '#fff',
                  fontSize: '14px',
                  minHeight: '80px',
                  boxSizing: 'border-box',
                  fontFamily: 'monospace'
                }}
              />
              <button
                onClick={handleAddItem}
                style={{
                  padding: '8px',
                  background: '#FEE000',
                  color: '#1C0962',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Add Item
              </button>
            </div>
          </div>

          {/* Items List */}
          <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 1rem', color: '#FEE000' }}>
            Manage Items ({items.length})
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {items.map(item => (
              <div key={item.id} style={{ background: '#1a1f26', padding: '16px', borderRadius: '8px', border: '1px solid #FEE000' }}>
                {editingId === item.id ? (
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      style={{
                        padding: '8px',
                        border: '1px solid #FEE000',
                        borderRadius: '6px',
                        background: '#0f1419',
                        color: '#fff',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                    <textarea
                      value={editData.details}
                      onChange={(e) => setEditData({ ...editData, details: e.target.value })}
                      style={{
                        padding: '8px',
                        border: '1px solid #FEE000',
                        borderRadius: '6px',
                        background: '#0f1419',
                        color: '#fff',
                        fontSize: '14px',
                        minHeight: '60px',
                        boxSizing: 'border-box',
                        fontFamily: 'monospace'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={handleSaveEdit}
                        style={{
                          flex: 1,
                          padding: '6px',
                          background: '#6be084',
                          color: '#000',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px'
                        }}
                      >
                        <Check size={14} /> Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        style={{
                          flex: 1,
                          padding: '6px',
                          background: 'transparent',
                          color: '#FEE000',
                          border: '1px solid #FEE000',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px'
                        }}
                      >
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#19bbee' }}>
                        {item.type.toUpperCase()} • {item.category}
                      </span>
                      <h4 style={{ fontSize: '15px', fontWeight: 600, margin: '4px 0', color: '#FEE000' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>
                        {item.description}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => handleEditItem(item)}
                        style={{
                          padding: '6px',
                          background: '#FEE000',
                          color: '#1C0962',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        style={{
                          padding: '6px',
                          background: '#f45e04',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
