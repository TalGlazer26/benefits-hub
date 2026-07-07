import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Edit2, Trash2, Check, X, Download, Upload } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  // Editable Content
  const [content, setContent] = useState({
    countryName: 'Israel',
    mainTitle: 'IL Benefits & Policies Hub',
    mainTitleSize: '60',
    benefitsTitle: 'Benefits',
    benefitsTitleSize: '24',
    benefitsSubtitle: 'Your personal wellbeing & rewards',
    policiesTitle: 'Policies',
    policiesTitleSize: '24',
    policiesSubtitle: 'Guidelines, handbooks & company policies'
  });

  const [editingContent, setEditingContent] = useState(false);
  const [tempContent, setTempContent] = useState(content);
  
  const defaultItems = [
    { 
      id: 1, 
      type: 'policy',
      category: 'Time Off', 
      title: 'Time Off & Leave', 
      description: 'Time to rest & recharge',
      details: `We believe that taking time to rest, recharge, and spend time on what matters most is essential. That's why we offer generous time-off benefits for all our Israeli team members.

You'll receive annual vacation days based on your employment terms, with the flexibility to carry over up to 12 days into the next year. Need to take time off before accruing enough days? No problem – we can work with you (up to 10 days with manager and HRBP approval).

We also know life happens – so we've got you covered with paid sick leave, special days for weddings, parental support leave, and more. If you're ever unsure about what you're eligible for or have special circumstances, just reach out to your HRBP or Total Rewards team. We're here to help make it work for you.
[Policy Link]`,
      color: '#6be084'
    },
{ 
  id: 2, 
  type: 'benefit',
  category: 'Perks', 
  title: 'Maternity & Paternity', 
  description: 'Expanding your family',
  details: `If you're the non-birthing partner welcoming a new child, we want to make sure you have the time and support you need to celebrate and bond with your new family member.

We offer 10 paid working days of parental leave for non-birthing partners - 5 days immediately following the birth or arrival of your child, and an additional 5 days flexible within the first year. This applies whether you're welcoming a biological child, adopting, or becoming a parent through surrogacy.

Beyond time off, we also provide a special birth gift worth ₪520 – choose between a curated gift package or a gift card to pick what works best for your family.

To request your parental leave, just notify your manager and contact your HRBP to record it in Hibob. They're here to help make this transition as smooth as possible.
[Policy Link]`,
  color: '#d9d9d9'
},
{ 
  id: 3, 
  type: 'benefit',
  category: 'Perks', 
  title: '₪1000 Monthly Food Allowance', 
  description: 'Daily food & dining coverage',
  details: `We know that everyone deserves a good meal, and we want to make sure you're taken care of during your workday. We provide every employee with a monthly meal allowance of ₪1000 to cover your food and dining expenses.

You have the flexibility to choose from three popular meal platforms: Cibus, Ten Bis, or Wolt Benefits – each offering access to a wide network of restaurants, cafés, supermarkets, and food retailers across Israel. You can pick the platform that best suits your preferences and lifestyle.

Your ₪1000 allowance is loaded on the 21st of each month and runs through the 20th of the following month. You can change your chosen platform up to twice per year if you'd like to switch things up.

If you ever need help with your meal benefit account or have questions about your platform options, just reach out to our Employee Experience & Operations Team at Perso_Operations@personetics.com.

[Policy link]`,
  color: '#19bbee'
},
    { 
      id: 4, 
      type: 'policy',
      category: 'Global',
      title: 'Global Relocation Policy', 
      description: 'Support for employees relocating',
      details: 'Support and guidelines for employees relocating globally. Includes visa assistance, accommodation support, and relocation allowance.',
      color: '#fee000'
    },
    { 
      id: 5, 
      type: 'policy',
      category: 'Travel',
      title: 'Travel Policy', 
      description: 'Rules and reimbursements for business travel',
      details: 'Rules and reimbursements for business travel. Economy flights, hotel reimbursement up to ₪400/night.',
      color: '#d9d9d9'
    },
{ 
  id: 6, 
  type: 'benefit',
  category: 'IT', 
  title: 'IT Home Equipment Policy', 
  description: 'Everything you need to work from home',
  details: `Working from home is great – but it's even better when you have the right tools to do it comfortably and effectively. That's why we provide home office equipment to help you set up a productive workspace.

If you're a new team member working remotely or in a hybrid capacity, you're eligible to choose from five predefined equipment bundles that cover everything you need, from laptops and monitors to keyboards, headsets, and more.

Requesting your equipment is simple – just send an email to our IT team with your preferred bundle option, delivery address, and contact number, and we'll get it to you.

If anything needs repair or replacement due to normal wear and tear, we've got you covered at no cost. For any questions about the available bundles or the request process, our IT and HR teams are here to help.
[Policy link]`,
  color: '#6be084'
},
    { 
      id: 7, 
      type: 'policy',
      category: 'Expenses',
      title: 'Expense Reporting Policy', 
      description: 'How to report work-related expenses',
      details: 'How to report and get reimbursed for work-related expenses. Submit within 30 days with receipts.',
      color: '#6be084'
    },
{ 
  id: 8, 
  type: 'benefit',
  category: 'Perks', 
  title: 'Wedding Celebration', 
  description: 'Celebrate your special day',
  details: `Congratulations on your upcoming wedding! We're thrilled to celebrate this special milestone with you.

To help you make the most of your big day, we offer three (3) paid working days of wedding leave. You can use these days around your wedding celebrations and related events, anytime within a month of your wedding date.

In addition to your time off, we're also sending our best wishes with a wedding gift of ₪1500 added to your salary – our way of saying we're happy for you.

To request your wedding leave, just notify your manager and contact your HRBP to record it in Hibob. They'll make sure everything is set up so you can focus on celebrating.
[Policy Link]`,
  color: '#fee000'
},
    { 
  id: 9, 
  type: 'policy',
  category: 'Perks', 
  title: 'Employee Referral Program', 
  description: 'Get rewarded for great referrals',
  details: `Great people know great people. If you've got a talented friend or colleague who'd be perfect for Personetics, we want to hear about them – and we'll reward you for it!

When you refer someone to our team and they get hired for a full-time position, you'll receive a referral bonus once they successfully complete their first three months of employment. There's no limit to how many people you can refer, so feel free to spread the word.

The process is simple: visit the Personetics Careers page, find an open position that matches your referral, and submit their information through our referral link using your Personetics email. Just make sure to refer them before they apply directly to us or enter our recruitment process.

Your referral bonus will be paid through payroll in the cycle following your referred employee's three-month completion date. For questions about the program or how to get started, reach out to our Talent Acquisition Team.`,
  color: '#19bbee'
},
  ];

  const [items, setItems] = useState(defaultItems);
  const [newItem, setNewItem] = useState({ type: 'benefit', category: '', title: '', description: '', details: '', color: '#19bbee' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // ✅ Load from storage on mount
  useEffect(() => {
    try {
      const savedItems = window.storage?.get('benefits_items');
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
    } catch (e) {
      console.log('No saved items yet');
    }

    try {
      const savedContent = window.storage?.get('benefits_content');
      if (savedContent) {
        setContent(JSON.parse(savedContent));
      }
    } catch (e) {
      console.log('No saved content yet');
    }
  }, []);

  // ✅ Save to storage whenever items change
  const updateItems = (newItems) => {
    setItems(newItems);
    try {
      window.storage?.set('benefits_items', JSON.stringify(newItems));
    } catch (e) {
      console.log('Could not save items');
    }
  };

  // ✅ Save to storage whenever content changes
  const updateContent = (newContent) => {
    setContent(newContent);
    try {
      window.storage?.set('benefits_content', JSON.stringify(newContent));
    } catch (e) {
      console.log('Could not save content');
    }
  };

  const handleViewDetail = (item) => {
    setSelectedItem(item);
    setView('detail');
  };

  const handleAddItem = () => {
    if (newItem.category && newItem.title && newItem.description) {
      const updatedItems = [...items, { id: Date.now(), ...newItem }];
      updateItems(updatedItems);
      setNewItem({ type: 'benefit', category: '', title: '', description: '', details: '', color: '#19bbee' });
    }
  };

  const handleEditItem = (item) => {
    setEditingId(item.id);
    setEditData({ ...item });
  };

  const handleSaveEdit = () => {
    const updatedItems = items.map(i => i.id === editingId ? editData : i);
    updateItems(updatedItems);
    setEditingId(null);
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter(i => i.id !== id);
    updateItems(updatedItems);
  };

  const handleSaveContent = () => {
    updateContent(tempContent);
    setEditingContent(false);
  };

  // ✅ Export data
  const handleExport = () => {
    const data = {
      items,
      content,
      exportDate: new Date().toISOString()
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `benefits_hub_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // ✅ Import data
  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result);
        if (data.items && data.content) {
          updateItems(data.items);
          updateContent(data.content);
          alert('✅ Data imported successfully!');
        } else {
          alert('❌ Invalid backup file');
        }
      } catch (error) {
        alert('❌ Could not import file');
      }
    };
    reader.readAsText(file);
  };

  // ✅ Reset to defaults
  const handleReset = () => {
    if (window.confirm('Are you sure? This will reset all changes to defaults.')) {
      updateItems(defaultItems);
      updateContent({
        countryName: 'Israel',
        mainTitle: 'IL Benefits & Policies Hub',
        mainTitleSize: '60',
        benefitsTitle: 'Benefits',
        benefitsTitleSize: '24',
        benefitsSubtitle: 'Your personal wellbeing & rewards',
        policiesTitle: 'Policies',
        policiesTitleSize: '24',
        policiesSubtitle: 'Guidelines, handbooks & company policies'
      });
      alert('✅ Reset to defaults!');
    }
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

  // ============ FIXED LOGO COMPONENT ============
  const FixedLogo = () => (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 1000
    }}>
      <img src="/Logo.png" alt="Personetics" style={{ height: '35px', display: 'block' }} />
    </div>
  );

  // ============ HOME VIEW ============
  if (view === 'home' && !adminMode) {
    const benefits = items.filter(i => i.type === 'benefit');
    const policies = items.filter(i => i.type === 'policy');

    return (
      <div style={{ minHeight: '100vh', background: '#fafaf8', color: '#000' }}>
        {/* Fixed Logo */}
        <FixedLogo />

        {/* Banner Section */}
        <div style={{
          backgroundImage: 'url(/Banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem 2rem 4rem 2rem',
          position: 'relative',
          minHeight: '450px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Spacer - pushes content down */}
          <div style={{ flex: 1 }} />

          {/* Content - Main Area */}
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2, width: '100%' }}>
            {/* Country Flag + Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontSize: '18px', fontWeight: 600, color: '#fff' }}>
              <img src="/il flag.png" alt="Israel flag" style={{ height: '32px' }} />
              <span>{content.countryName}</span>
            </div>

            {/* Main Title */}
            <h2 style={{ fontSize: `${content.mainTitleSize}px`, fontWeight: 700, margin: '0 0 0.5rem', color: '#fff', letterSpacing: '-1px' }}>
              {content.mainTitle}
            </h2>

            {/* Subtitle */}
            <p style={{ fontSize: '18px', color: '#fff', margin: 0, opacity: 0.95 }}>
              You have {items.length} active benefits and policies available.
            </p>
          </div>
        </div>

        {/* Main Content - Yellow Background */}
        <div style={{ 
          padding: '1rem 2rem 4rem 2rem',
          background: 'linear-gradient(180deg, #fee000 0%, #fef5d9 100%)'
        }}>
          {/* White Container עדין */}
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.5)'
          }}>
            {/* Benefits Section */}
            <div style={{ marginBottom: '4rem' }}>
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
            <div>
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
        {/* Fixed Logo */}
        <FixedLogo />

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
            
            <p style={{ 
              fontSize: '18px', 
              color: '#000', 
              margin: 0, 
              lineHeight: '1.8', 
              opacity: 0.9,
              whiteSpace: 'pre-wrap'
            }}>
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
        {/* Fixed Logo */}
        <FixedLogo />

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
        {/* Fixed Logo */}
        <FixedLogo />

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

          {/* Backup & Restore Section */}
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '2px solid #fee000', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 1.5rem', color: '#000' }}>
              💾 Backup & Restore
            </h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={handleExport}
                style={{
                  padding: '10px 16px',
                  background: '#19bbee',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Download size={16} />
                Export Data
              </button>
              
              <label style={{
                padding: '10px 16px',
                background: '#6be084',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Upload size={16} />
                Import Data
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  style={{ display: 'none' }}
                />
              </label>

              <button
                onClick={handleReset}
                style={{
                  padding: '10px 16px',
                  background: '#ff6b6b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '14px'
                }}
              >
                Reset to Defaults
              </button>
            </div>
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
