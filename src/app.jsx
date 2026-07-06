import React, { useState } from 'react';
import { ChevronLeft, Plus, Edit2, Trash2, Check, X } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  // Editable Content
  const [content, setContent] = useState({
    countryName: 'Israel',
    mainTitle: 'IL Benefits & Policies Hub',
    mainTitleSize: '48',
    benefitsTitle: 'Benefits',
    benefitsTitleSize: '24',
    benefitsSubtitle: 'Your personal wellbeing & rewards',
    policiesTitle: 'Policies',
    policiesTitleSize: '24',
    policiesSubtitle: 'Guidelines, handbooks & company policies'
  });

  const [editingContent, setEditingContent] = useState(false);
  const [tempContent, setTempContent] = useState(content);
  
  const [items, setItems] = useState([
    { 
      id: 1, 
      type: 'benefit',
      category: 'Health', 
      title: 'Medical Insurance', 
      description: 'Coverage for you and your family',
      details: 'Comprehensive medical insurance coverage for you and your dependents. Includes annual checkups, emergency care, and prescription medications.',
      color: '#6be084'
    },
    { 
      id: 2, 
      type: 'benefit',
      category: 'Health', 
      title: 'Dental Plan', 
      description: 'Annual dental checkups and procedures',
      details: 'Annual dental checkups and basic procedures covered. Includes cleanings, fillings, and root canals up to 80% coverage.',
      color: '#19bbee'
    },
    { 
      id: 3, 
      type: 'benefit',
      category: 'Time Off', 
      title: 'Time Off & Leave', 
      description: 'Time to rest & recharge',
      details: '20 days of paid vacation annually. Plus flexible work arrangements and mental health days.',
      color: '#fee000'
    },
    { 
      id: 4, 
      type: 'benefit',
      category: 'Perks', 
      title: 'Maternity & Paternity', 
      description: 'Expanding your family',
      details: 'Up to 4 months paid parental leave. Flexible return-to-work options and childcare support.',
      color: '#d9d9d9'
    },
    { 
      id: 5, 
      type: 'benefit',
      category: 'Perks', 
      title: '₪350 Monthly Wellness', 
      description: 'Monthly allowance for health & wellness',
      details: 'Monthly allowance to invest in your health and wellness. Use for gym, yoga, meditation apps, or wellness equipment.',
      color: '#6be084'
    },
    { 
      id: 6, 
      type: 'benefit',
      category: 'Perks', 
      title: '₪1000 Monthly Food', 
      description: 'Daily food & dining coverage',
      details: 'Daily food and dining covered via Cibus. Order lunch or dinner to your office or home.',
      color: '#19bbee'
    },
    { 
      id: 7, 
      type: 'policy',
      category: 'Global',
      title: 'Global Relocation Policy', 
      description: 'Support for employees relocating',
      details: 'Support and guidelines for employees relocating globally. Includes visa assistance, accommodation support, and relocation allowance.',
      color: '#fee000'
    },
    { 
      id: 8, 
      type: 'policy',
      category: 'Travel',
      title: 'Travel Policy', 
      description: 'Rules and reimbursements for business travel',
      details: 'Rules and reimbursements for business travel. Economy flights, hotel reimbursement up to ₪400/night.',
      color: '#d9d9d9'
    },
    { 
      id: 9, 
      type: 'policy',
      category: 'Expenses',
      title: 'Expense Reporting Policy', 
      description: 'How to report work-related expenses',
      details: 'How to report and get reimbursed for work-related expenses. Submit within 30 days with receipts.',
      color: '#6be084'
    },
  ]);

  const [newItem, setNewItem] = useState({ type: 'benefit', category: '', title: '', description: '', details: '', color: '#19bbee' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleViewDetail = (item) => {
    setSelectedItem(item);
    setView('detail');
  };

  const handleAddItem = () => {
    if (newItem.category && newItem.title && newItem.description) {
      setItems([...items, { id: Date.now(), ...newItem }]);
      setNewItem({ type: 'benefit', category: '', title: '', description: '', details: '', color: '#19bbee' });
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

  const handleSaveContent = () => {
    setContent(tempContent);
    setEditingContent(false);
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
      <div style={{ minHeight: '100vh', background: '#fafaf8', color: '#000' }}>
        {/* Top Navigation Bar */}
        <div style={{
          background: '#000',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <img src="/Logo.png" alt="Personetics" style={{ height: '32px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#fff', fontWeight: 600 }}>
            <img src="/il flag.png" alt="Israel flag" style={{ height: '24px', marginRight: '4px' }} />
            {content.countryName}
          </div>
        </div>

        {/* Banner Section */}
        <div style={{
          backgroundImage: 'url(/Banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '4rem 2rem',
          position: 'relative',
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {/* Content */}
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2, width: '100%' }}>
            <h2 style={{ fontSize: `${content.mainTitleSize}px`, fontWeight: 700, margin: '0 0 1rem', color: '#fff', letterSpacing: '-1px' }}>
              {content.mainTitle}
            </h2>
            <p style={{ fontSize: '18px', color: '#fff', margin: 0, opacity: 0.95 }}>
              You have {items.length} active benefits and policies available.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: '3rem 2rem', background: 'linear-gradient(180deg, #fee000 0%, #fef5d9 100%)' }}>
          {/* Benefits Section */}
          <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '4rem' }}>
            <h3 style={{ fontSize: `${content.benefitsTitleSize}px`, fontWeight: 700, margin: '0 0 0.5rem', color: '#000' }}>
              {content.benefitsTitle}
            </h3>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 2rem' }}>
              {content.benefitsSubtitle}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {benefits.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleViewDetail(item)}
                  style={{
                    background: item.color,
                    borderRadius: '16px',
                    padding: '32px 24px',
                    cursor: 'pointer',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    minHeight: '240px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#000', letterSpacing: '1px', opacity: 0.7 }}>
                      {item.category.toUpperCase()}
                    </span>
                    <div style={{ width: '50px', height: '3px', background: '#000', margin: '12px 0', opacity: 0.3 }} />
                    <h4 style={{ fontSize: '20px', fontWeight: 700, margin: '16px 0 12px', color: '#000' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '15px', color: '#000', margin: 0, opacity: 0.8, lineHeight: '1.5' }}>
                      {item.description}
                    </p>
                  </div>
                  <button onClick={() => handleViewDetail(item)} style={{ fontSize: '14px', color: '#000', background: 'none', border: 'none', textDecoration: 'none', fontWeight: 700, marginTop: '16px', cursor: 'pointer', padding: 0, textAlign: 'left', opacity: 0.7 }}>
                    View details →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Policies Section */}
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h3 style={{ fontSize: `${content.policiesTitleSize}px`, fontWeight: 700, margin: '0 0 0.5rem', color: '#000' }}>
              {content.policiesTitle}
            </h3>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 2rem' }}>
              {content.policiesSubtitle}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginBottom: '3rem' }}>
              {policies.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleViewDetail(item)}
                  style={{
                    background: item.color,
                    borderRadius: '16px',
                    padding: '32px 24px',
                    cursor: 'pointer',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    minHeight: '240px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#000', letterSpacing: '1px', opacity: 0.7 }}>
                      {item.category.toUpperCase()}
                    </span>
                    <div style={{ width: '50px', height: '3px', background: '#000', margin: '12px 0', opacity: 0.3 }} />
                    <h4 style={{ fontSize: '20px', fontWeight: 700, margin: '16px 0 12px', color: '#000' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '15px', color: '#000', margin: 0, opacity: 0.8, lineHeight: '1.5' }}>
                      {item.description}
                    </p>
                  </div>
                  <button onClick={() => handleViewDetail(item)} style={{ fontSize: '14px', color: '#000', background: 'none', border: 'none', textDecoration: 'none', fontWeight: 700, marginTop: '16px', cursor: 'pointer', padding: 0, textAlign: 'left', opacity: 0.7 }}>
                    View details →
                  </button>
                </div>
              ))}
            </div>

            {/* Admin Button */}
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <button
                onClick={() => setView('admin-login')}
                style={{
                  padding: '12px 20px',
                  fontSize: '14px',
                  background: '#000',
                  border: 'none',
                  color: '#fee000',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 700
                }}
              >
                Admin Access
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ DETAIL VIEW ============
  if (view === 'detail' && selectedItem) {
    return (
      <div style={{ minHeight: '100vh', background: '#fafaf8', color: '#000', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <button
            onClick={() => setView('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              border: 'none',
              color: '#000',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 600,
              marginBottom: '2rem'
            }}
          >
            <ChevronLeft size={20} />
            Back
          </button>

          <div style={{
            background: selectedItem.color,
            borderRadius: '16px',
            padding: '48px 40px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
          }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#000', letterSpacing: '1px', opacity: 0.7 }}>
              {selectedItem.category.toUpperCase()}
            </span>
            <div style={{ width: '60px', height: '4px', background: '#000', margin: '16px 0 32px', opacity: 0.3 }} />
            
            <h1 style={{ fontSize: '40px', fontWeight: 700, margin: '0 0 24px', color: '#000' }}>
              {selectedItem.title}
            </h1>
            
            <p style={{ fontSize: '18px', color: '#000', margin: 0, lineHeight: '1.8', opacity: 0.9 }}>
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
      <div style={{ minHeight: '100vh', background: '#fafaf8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', border: '2px solid #fee000', maxWidth: '400px', width: '100%', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 1.5rem', color: '#000' }}>
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
              padding: '12px 14px',
              fontSize: '14px',
              border: '2px solid #fee000',
              borderRadius: '8px',
              marginBottom: '1rem',
              boxSizing: 'border-box',
              background: '#fafaf8',
              color: '#000'
            }}
            autoFocus
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleAdminAccess}
              style={{
                flex: 1,
                padding: '12px',
                background: '#fee000',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '14px'
              }}
            >
              Access
            </button>
            <button
              onClick={() => setView('home')}
              style={{
                flex: 1,
                padding: '12px',
                background: '#fff',
                color: '#000',
                border: '2px solid #fee000',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
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
      <div style={{ minHeight: '100vh', background: '#fafaf8', color: '#000', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 700, margin: 0, color: '#000' }}>
              Admin Dashboard
            </h1>
            <button
              onClick={() => { setAdminMode(false); setView('home'); }}
              style={{
                padding: '10px 18px',
                background: '#fff',
                border: '2px solid #fee000',
                color: '#000',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              Logout
            </button>
          </div>

          {/* Edit Content */}
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '2px solid #fee000', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#000' }}>
                Edit Content & Design
              </h3>
              {!editingContent && (
                <button
                  onClick={() => {
                    setEditingContent(true);
                    setTempContent(content);
                  }}
                  style={{
                    padding: '6px 12px',
                    background: '#fee000',
                    color: '#000',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '13px'
                  }}
                >
                  <Edit2 size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Edit
                </button>
              )}
            </div>

            {editingContent ? (
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#000', display: 'block', marginBottom: '4px' }}>
                    Country Name
                  </label>
                  <input
                    type="text"
                    value={tempContent.countryName}
                    onChange={(e) => setTempContent({ ...tempContent, countryName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #fee000',
                      borderRadius: '8px',
                      background: '#fafaf8',
                      color: '#000',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#000', display: 'block', marginBottom: '4px' }}>
                    Main Title
                  </label>
                  <input
                    type="text"
                    value={tempContent.mainTitle}
                    onChange={(e) => setTempContent({ ...tempContent, mainTitle: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #fee000',
                      borderRadius: '8px',
                      background: '#fafaf8',
                      color: '#000',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#000', display: 'block', marginBottom: '4px' }}>
                    Main Title Size (px)
                  </label>
                  <input
                    type="number"
                    value={tempContent.mainTitleSize}
                    onChange={(e) => setTempContent({ ...tempContent, mainTitleSize: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #fee000',
                      borderRadius: '8px',
                      background: '#fafaf8',
                      color: '#000',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#000', display: 'block', marginBottom: '4px' }}>
                    Benefits Title
                  </label>
                  <input
                    type="text"
                    value={tempContent.benefitsTitle}
                    onChange={(e) => setTempContent({ ...tempContent, benefitsTitle: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #fee000',
                      borderRadius: '8px',
                      background: '#fafaf8',
                      color: '#000',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#000', display: 'block', marginBottom: '4px' }}>
                    Benefits Title Size (px)
                  </label>
                  <input
                    type="number"
                    value={tempContent.benefitsTitleSize}
                    onChange={(e) => setTempContent({ ...tempContent, benefitsTitleSize: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #fee000',
                      borderRadius: '8px',
                      background: '#fafaf8',
                      color: '#000',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#000', display: 'block', marginBottom: '4px' }}>
                    Benefits Subtitle
                  </label>
                  <input
                    type="text"
                    value={tempContent.benefitsSubtitle}
                    onChange={(e) => setTempContent({ ...tempContent, benefitsSubtitle: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #fee000',
                      borderRadius: '8px',
                      background: '#fafaf8',
                      color: '#000',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#000', display: 'block', marginBottom: '4px' }}>
                    Policies Title
                  </label>
                  <input
                    type="text"
                    value={tempContent.policiesTitle}
                    onChange={(e) => setTempContent({ ...tempContent, policiesTitle: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #fee000',
                      borderRadius: '8px',
                      background: '#fafaf8',
                      color: '#000',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#000', display: 'block', marginBottom: '4px' }}>
                    Policies Title Size (px)
                  </label>
                  <input
                    type="number"
                    value={tempContent.policiesTitleSize}
                    onChange={(e) => setTempContent({ ...tempContent, policiesTitleSize: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #fee000',
                      borderRadius: '8px',
                      background: '#fafaf8',
                      color: '#000',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#000', display: 'block', marginBottom: '4px' }}>
                    Policies Subtitle
                  </label>
                  <input
                    type="text"
                    value={tempContent.policiesSubtitle}
                    onChange={(e) => setTempContent({ ...tempContent, policiesSubtitle: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #fee000',
                      borderRadius: '8px',
                      background: '#fafaf8',
                      color: '#000',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleSaveContent}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: '#6be084',
                      color: '#000',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '13px'
                    }}
                  >
                    <Check size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingContent(false)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: '#f5f5f5',
                      color: '#000',
                      border: '2px solid #fee000',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '13px'
                    }}
                  >
                    <X size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '8px' }}>
                <div><strong>Country:</strong> {content.countryName}</div>
                <div><strong>Main Title:</strong> {content.mainTitle} ({content.mainTitleSize}px)</div>
                <div><strong>Benefits Title:</strong> {content.benefitsTitle} ({content.benefitsTitleSize}px)</div>
                <div><strong>Benefits Subtitle:</strong> {content.benefitsSubtitle}</div>
                <div><strong>Policies Title:</strong> {content.policiesTitle} ({content.policiesTitleSize}px)</div>
                <div><strong>Policies Subtitle:</strong> {content.policiesSubtitle}</div>
              </div>
            )}
          </div>

          {/* Add Item */}
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '2px solid #fee000', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 1.5rem', color: '#000' }}>
              <Plus size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: '-2px' }} />
              Add New Item
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                style={{
                  padding: '10px',
                  border: '2px solid #fee000',
                  borderRadius: '8px',
                  background: '#fafaf8',
                  color: '#000',
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
                  padding: '10px',
                  border: '2px solid #fee000',
                  borderRadius: '8px',
                  background: '#fafaf8',
                  color: '#000',
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
                  padding: '10px',
                  border: '2px solid #fee000',
                  borderRadius: '8px',
                  background: '#fafaf8',
                  color: '#000',
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
                  padding: '10px',
                  border: '2px solid #fee000',
                  borderRadius: '8px',
                  background: '#fafaf8',
                  color: '#000',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <textarea
                placeholder="Full Details"
                value={newItem.details}
                onChange={(e) => setNewItem({ ...newItem, details: e.target.value })}
                style={{
                  padding: '10px',
                  border: '2px solid #fee000',
                  borderRadius: '8px',
                  background: '#fafaf8',
                  color: '#000',
                  fontSize: '14px',
                  minHeight: '80px',
                  boxSizing: 'border-box',
                  fontFamily: 'monospace'
                }}
              />
              <select
                value={newItem.color}
                onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                style={{
                  padding: '10px',
                  border: '2px solid #fee000',
                  borderRadius: '8px',
                  background: '#fafaf8',
                  color: '#000',
                  fontSize: '14px'
                }}
              >
                <option value="#19bbee">Cyan</option>
                <option value="#6be084">Green</option>
                <option value="#fee000">Yellow</option>
                <option value="#d9d9d9">Gray</option>
              </select>
              <button
                onClick={handleAddItem}
                style={{
                  padding: '10px',
                  background: '#fee000',
                  color: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 700
                }}
              >
                Add Item
              </button>
            </div>
          </div>

          {/* Items List */}
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 1.5rem', color: '#000' }}>
            Manage Items ({items.length})
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {items.map(item => (
              <div key={item.id} style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '2px solid #fee000' }}>
                {editingId === item.id ? (
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      style={{
                        padding: '8px',
                        border: '2px solid #fee000',
                        borderRadius: '6px',
                        background: '#fafaf8',
                        color: '#000',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                    <textarea
                      value={editData.details}
                      onChange={(e) => setEditData({ ...editData, details: e.target.value })}
                      style={{
                        padding: '8px',
                        border: '2px solid #fee000',
                        borderRadius: '6px',
                        background: '#fafaf8',
                        color: '#000',
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
                          background: '#f5f5f5',
                          color: '#000',
                          border: '2px solid #fee000',
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
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#000', opacity: 0.6 }}>
                        {item.type.toUpperCase()} • {item.category}
                      </span>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '4px 0', color: '#000' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
                        {item.description}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => handleEditItem(item)}
                        style={{
                          padding: '6px',
                          background: '#fee000',
                          color: '#000',
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
                          background: '#ff6b6b',
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
