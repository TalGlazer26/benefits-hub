import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit2, Check, X } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState('employee');
  const [items, setItems] = useState([
    { id: 1, category: 'Health', title: 'Medical Insurance', content: 'Comprehensive medical coverage for you and your family.' },
    { id: 2, category: 'Health', title: 'Dental Plan', content: 'Annual dental checkups and basic procedures covered.' },
    { id: 3, category: 'Time Off', title: 'Vacation Policy', content: '20 days of paid vacation annually.' },
    { id: 4, category: 'Retirement', title: '401(k) Matching', content: 'We match 100% of contributions up to 6%.' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [newItem, setNewItem] = useState({ category: '', title: '', content: '' });
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  const categories = [...new Set(items.map(i => i.category))];
  
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({ ...item });
  };

  const handleSaveEdit = () => {
    setItems(items.map(i => i.id === editingId ? editData : i));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleAddItem = () => {
    if (newItem.category && newItem.title && newItem.content) {
      setItems([...items, { id: Date.now(), ...newItem }]);
      setNewItem({ category: '', title: '', content: '' });
    }
  };

  const handleAdminAccess = () => {
    if (adminPassword === 'admin123') {
      setIsAuthenticated(true);
      setShowPasswordPrompt(false);
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminPassword('');
  };

  // EMPLOYEE VIEW
  if (mode === 'employee' && !showPasswordPrompt) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 0.5rem', color: '#1a1a1a' }}>
            Benefits & Policies Hub
          </h1>
          <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>
            Find all information about your benefits and company policies
          </p>
        </div>

        <div style={{ marginBottom: '2rem', position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '12px', width: '18px', height: '18px', color: '#999' }} />
          <input
            type="text"
            placeholder="Search benefits, policies, time off..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: '40px',
              padding: '12px 12px 12px 40px',
              fontSize: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxSizing: 'border-box',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          />
        </div>

        <div style={{ display: 'grid', gap: '12px', marginBottom: '2rem' }}>
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div key={item.id} style={{
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '16px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>
                    {item.title}
                  </h3>
                  <span style={{
                    fontSize: '12px',
                    background: '#e3f2fd',
                    color: '#1976d2',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.category}
                  </span>
                </div>
                <p style={{ fontSize: '15px', color: '#555', margin: 0, lineHeight: 1.6 }}>
                  {item.content}
                </p>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#999' }}>
              <p style={{ fontSize: '15px', margin: 0 }}>No results found. Try a different search.</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowPasswordPrompt(true)}
          style={{
            padding: '10px 16px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            background: '#f5f5f5',
            color: '#666',
            cursor: 'pointer',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          Admin Access
        </button>
      </div>
    );
  }

  // PASSWORD PROMPT
  if (showPasswordPrompt && !isAuthenticated) {
    return (
      <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '1rem' }}>
        <div style={{
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 1.5rem', color: '#1a1a1a' }}>
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
              border: '1px solid #ddd',
              borderRadius: '6px',
              marginBottom: '1rem',
              boxSizing: 'border-box',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
            autoFocus
          />
          <p style={{ fontSize: '12px', color: '#999', margin: '0 0 1.5rem', fontStyle: 'italic' }}>
            Default password: admin123
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleAdminAccess}
              style={{
                flex: 1,
                padding: '10px',
                fontSize: '14px',
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              Access Admin
            </button>
            <button
              onClick={() => {
                setShowPasswordPrompt(false);
                setAdminPassword('');
              }}
              style={{
                flex: 1,
                padding: '10px',
                fontSize: '14px',
                background: '#f5f5f5',
                color: '#666',
                border: '1px solid #ddd',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN VIEW
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            background: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#666',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          Logout
        </button>
      </div>

      {/* Add New Item */}
      <div style={{
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 16px', color: '#1a1a1a' }}>
          <Plus style={{ width: '16px', height: '16px', display: 'inline', marginRight: '8px', verticalAlign: '-2px' }} />
          Add New Item
        </h2>
        <div style={{ display: 'grid', gap: '12px' }}>
          <input
            type="text"
            placeholder="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            style={{
              padding: '10px 12px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              backgroundColor: '#fff',
              boxSizing: 'border-box',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          />
          <input
            type="text"
            placeholder="Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            style={{
              padding: '10px 12px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              backgroundColor: '#fff',
              boxSizing: 'border-box',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          />
          <textarea
            placeholder="Description"
            value={newItem.content}
            onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
            style={{
              padding: '10px 12px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              backgroundColor: '#fff',
              minHeight: '100px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              boxSizing: 'border-box'
            }}
          />
          <button
            onClick={handleAddItem}
            style={{
              padding: '10px 16px',
              fontSize: '14px',
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 500,
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Edit & Manage Items */}
      <h2 style={{ fontSize: '18px', fontWeight: 600, margin: '1.5rem 0 16px', color: '#1a1a1a' }}>
        Manage Items ({items.length})
      </h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        {items.map(item => (
          <div key={item.id} style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '12px',
          }}>
            {editingId === item.id ? (
              <div style={{ display: 'grid', gap: '8px' }}>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  style={{
                    padding: '8px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    backgroundColor: '#fff',
                    boxSizing: 'border-box',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}
                />
                <textarea
                  value={editData.content}
                  onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                  style={{
                    padding: '8px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    backgroundColor: '#fff',
                    minHeight: '80px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleSaveEdit}
                    style={{
                      padding: '6px 12px',
                      fontSize: '13px',
                      background: '#4caf50',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                  >
                    <Check style={{ width: '14px', height: '14px' }} /> Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '13px',
                      background: '#f5f5f5',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      color: '#666',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                  >
                    <X style={{ width: '14px', height: '14px' }} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{
                      fontSize: '12px',
                      background: '#e3f2fd',
                      color: '#1976d2',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      {item.category}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 4px', color: '#1a1a1a' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0, lineHeight: 1.5 }}>
                    {item.content}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '6px', marginLeft: '12px' }}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      padding: '6px',
                      background: '#f5f5f5',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#666'
                    }}
                  >
                    <Edit2 style={{ width: '14px', height: '14px' }} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      padding: '6px',
                      background: '#f5f5f5',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#d32f2f'
                    }}
                  >
                    <Trash2 style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setMode('employee');
          handleLogout();
        }}
        style={{
          marginTop: '2rem',
          padding: '10px 16px',
          fontSize: '14px',
          border: '1px solid #ddd',
          borderRadius: '6px',
          background: '#f5f5f5',
          color: '#666',
          cursor: 'pointer',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        View as Employee
      </button>
    </div>
  );
}
