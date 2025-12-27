import React, { useState } from 'react';
import './App.css'; // 作成したCSSファイルを読み込み
import { BookOpen, ShoppingBag, Flame, MessageSquare, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';

const PatisserieApp = () => {
  const [activeTab, setActiveTab] = useState('service');

  const tabs = [
    { id: 'service', label: '接客フロー', icon: ShoppingBag },
    { id: 'products', label: '商品知識', icon: BookOpen },
    { id: 'cooking', label: '技術マニュアル', icon: Flame },
    { id: 'etiquette', label: '言葉遣い・基本', icon: MessageSquare }
  ];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1>patisserie.porte</h1>
        <p>スタッフ専用マニュアル</p>
      </header>

      {/* Tab Navigation */}
      <nav className="tab-nav">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              <Icon className="tab-icon" />
              <div>{tab.label}</div>
            </button>
          );
        })}
      </nav>

      {/* Content */}
      <main className="main-content">
        {activeTab === 'service' && <ServiceFlow />}
        {activeTab === 'products' && <ProductMenu />}
        {activeTab === 'cooking' && <CookingTech />}
        {activeTab === 'etiquette' && <Etiquette />}
      </main>
    </div>
  );
};

// 接客フロー
const ServiceFlow = () => {
  const steps = [
    {
      title: '来店・アプローチ',
      items: [
        { type: 'speech', text: 'いらっしゃいませー。' },
        { type: 'speech', text: 'お決まりになられましたらお声がけください', condition: '悩み中' },
        { type: 'point', text: '視線はお客様に向けつつ、作業をしているふりをして圧をかけないこと' },
        { type: 'speech', text: 'お決まりでしたらお伺いいたします。', condition: '注文決定' }
      ]
    },
    {
      title: 'オーダー・確認',
      items: [
        { type: 'action', text: 'ケーキは手前（減っている列）から取る。常にショーケースを整える' },
        { type: 'action', text: 'トレーに載せる際は、ケーキの正面をお客様側に向ける' },
        { type: 'speech', text: 'こちらの商品でお取り間違いないでしょうか？' },
        { type: 'action', text: 'トレーを少し持ち上げ、商品を見やすく提示する' },
        { type: 'speech', text: 'ありがとうございます。', condition: '確認後' }
      ]
    },
    {
      title: 'レジ誘導・準備',
      items: [
        { type: 'speech', text: 'レジの方にお進みになってお待ち下さい。' },
        { type: 'action', text: '箱詰め・準備フロー：' },
        { type: 'action', text: '①箱詰め（※ブリュレはこのタイミングで焼く）', indent: true },
        { type: 'action', text: '②エンボス手袋を外す', indent: true },
        { type: 'action', text: '③スペーサーを入れる（隙間を埋める）', indent: true },
        { type: 'action', text: '④保冷剤を入れる（効果は約2時間と認識）', indent: true },
        { type: 'action', text: '⑤レジ打ち', indent: true }
      ]
    },
    {
      title: 'お会計',
      items: [
        { type: 'speech', text: 'お待たせいたしました。お会計が〇〇円になります。' },
        { type: 'action', text: 'お客様がお金をトレーに置く' },
        { type: 'speech', text: '〇〇円お預かりいたします。' },
        { type: 'action', text: 'お金をレジ横のトレーに一旦置く（即収納しない）' },
        { type: 'speech', text: 'お先のお渡しが、千、2千、3千円のお渡しと、', condition: 'お釣り（紙幣）' },
        { type: 'action', text: 'お客様の目の前で枚数を数えながら渡す' },
        { type: 'speech', text: 'おあと〇〇円とレシートのお渡しになります。', condition: 'お釣り（小銭・レシート）' },
        { type: 'action', text: 'レシートの上に小銭を乗せて渡す' },
        { type: 'speech', text: 'お隣でお待ち下さい。' }
      ]
    },
    {
      title: 'お渡し',
      items: [
        { type: 'speech', text: '大変お待たせいたしました。ありがとうございました。お気をつけてお持ち帰りください。', emoji: '😊' }
      ]
    }
  ];

  return (
    <div className="flow-container">
      {steps.map((step, idx) => (
        <div key={idx} className="card">
          <h3 className="card-title">
            <ChevronRight size={20} style={{ marginRight: '4px' }} />
            {step.title}
          </h3>
          <div>
            {step.items.map((item, itemIdx) => (
              <div key={itemIdx} className={`flow-step-wrapper ${item.indent ? 'flow-indent' : ''}`}>
                {item.type === 'speech' && (
                  <div className="speech-box">
                    {item.condition && (
                      <div className="speech-condition">【{item.condition}】</div>
                    )}
                    <p className="speech-text">「{item.text}」{item.emoji || ''}</p>
                  </div>
                )}
                {item.type === 'action' && (
                  <div className="action-box">
                    <CheckCircle className="check-icon" />
                    <span>{item.text}</span>
                  </div>
                )}
                {item.type === 'point' && (
                  <div className="point-box">
                    <div className="point-label">Point:</div>
                    <p className="point-text">{item.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// 商品知識
const ProductMenu = () => {
  const [category, setCategory] = useState('fresh');

  const products = {
    fresh: [
      { name: 'クリームブリュレ', price: 320, materials: '生クリーム/卵黄', feature: '濃厚とろとろ、表面はパリパリ' },
      { name: 'いちごの生ショート', price: 430, feature: 'ラズベリーソース使用' },
      { name: 'モンブラン', price: 380, feature: '栗の風味が引き立つシンプル味', warning: 'お酒使用' },
      { name: 'りんごのクリームケーキ', price: 400, feature: 'りんご果実入り。さっぱりめ', warning: 'お酒使用' },
      { name: 'レアチーズ', price: 350, feature: 'なめらかでクリーミー' }
    ],
    baked: [
      { name: 'パウンドケーキ', price: 210, feature: 'チョコ/クランベリー/オレンジ。重厚でしっとり' },
      { name: 'リーフパイ', price: 250, feature: 'バター香るパイ生地' },
      { name: 'マドレーヌ', price: 200, materials: '全卵', feature: '優しい風味' },
      { name: 'ナッツクッキー', price: 220, feature: '香ばしさ、甘じょっぱさ、コク' },
      { name: 'ガレット', price: 220, feature: 'バターと塩味、濃厚' },
      { name: 'フィナンシェ', price: 220, materials: '卵白', feature: 'バター/チョコ。バターの濃厚な風味' }
    ]
  };

  return (
    <div>
      {/* Category Toggle */}
      <div className="category-tabs">
        <button
          onClick={() => setCategory('fresh')}
          className={`category-btn ${category === 'fresh' ? 'active' : ''}`}
        >
          生菓子
        </button>
        <button
          onClick={() => setCategory('baked')}
          className={`category-btn ${category === 'baked' ? 'active' : ''}`}
        >
          焼き菓子
        </button>
      </div>

      {/* Product Cards */}
      <div className="product-list">
        {products[category].map((product, idx) => (
          <div key={idx} className="card">
            <div className="product-header">
              <h3 className="card-title" style={{ margin: 0 }}>{product.name}</h3>
              <span className="product-price">¥{product.price}</span>
            </div>
            {product.materials && (
              <div className="product-detail">
                <span style={{ fontWeight: 'bold' }}>材料：</span>{product.materials}
              </div>
            )}
            <div className="product-detail">
              <span style={{ fontWeight: 'bold' }}>特徴：</span>{product.feature}
            </div>
            {product.warning && (
              <div className="product-warning">
                <AlertCircle size={16} style={{ marginRight: '4px' }} />
                {product.warning}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// 技術マニュアル
const CookingTech = () => {
  return (
    <div>
      <div className="card">
        <h3 className="section-title">
          <Flame size={24} style={{ marginRight: '8px' }} />
          ブリュレの焼き方
        </h3>
        
        <div className="step-list">
          <h4 style={{ color: '#78350f', margin: '0 0 12px 0' }}>手順</h4>
          <div>
            <div className="step-item">
              <div className="step-number">1</div>
              <p style={{ margin: '2px 0 0 0' }}>霧吹き → 砂糖（カソナード）をかける</p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <p style={{ margin: '2px 0 0 0' }}>上記をもう一度繰り返す（計2回）</p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <p style={{ margin: '2px 0 0 0' }}>バーナーで炙る</p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ color: '#78350f', margin: '0 0 12px 0' }}>バーナーのコツ</h4>
          <div className="tips-box">
            <p className="tips-title">基本姿勢</p>
            <p className="tips-content" style={{ margin: 0 }}>火力を安定させ、ふちをゆっくり2周回す</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="sub-tips green">
              <p className="tips-title" style={{ color: '#14532d', marginBottom: '4px' }}>【初心者】垂直（平行）に持つ</p>
              <p style={{ fontSize: '0.875rem', color: '#166534', margin: 0 }}>これが一番安定する</p>
            </div>
            <div className="sub-tips amber">
              <p className="tips-title" style={{ color: '#78350f', marginBottom: 0 }}>【慣れてきたら】45度くらい傾けてもOK</p>
            </div>
          </div>
        </div>

        <div className="caution-box">
          <AlertCircle size={20} style={{ color: '#dc2626', marginRight: '8px', flexShrink: 0 }} />
          <div className="caution-content">
            <p style={{ fontWeight: 'bold', color: '#7f1d1d', margin: '0 0 4px 0' }}>注意事項</p>
            <ul>
              <li>• 焦げたら提供不可（新しいものでやり直す）</li>
              <li>• 炙り不足もNG</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// 言葉遣い・基本
const Etiquette = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* NGワードと言い換え */}
      <div className="card">
        <h3 className="card-title">NGワードと言い換え</h3>
        <div>
          <div className="ng-ok-row ng-row">
            <span className="mark ng">✕</span>
            <span style={{ textDecoration: 'line-through', color: '#7f1d1d' }}>すみません</span>
          </div>
          <div className="ng-ok-row ok-row">
            <span className="mark ok">◎</span>
            <span style={{ fontWeight: 'bold', color: '#14532d' }}>申し訳ございません</span>
          </div>
        </div>
      </div>

      {/* 推奨される語尾 */}
      <div className="card">
        <h3 className="card-title">推奨される語尾</h3>
        <div style={{ backgroundColor: '#fffbeb', padding: '12px', borderRadius: '4px', color: '#78350f' }}>
          <p style={{ margin: 0 }}>「<span style={{ fontWeight: 'bold' }}>〜になります</span>」「<span style={{ fontWeight: 'bold' }}>〜でしょうか</span>」を基本とする</p>
        </div>
      </div>

      {/* マジックワード */}
      <div className="card">
        <h3 className="card-title">✨ マジックワード</h3>
        <div className="magic-word-box">
          <p style={{ margin: 0 }}>一区切りつくたびに</p>
          <p className="magic-word-main">「ありがとうございます」</p>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>を挟むと印象が良い</p>
        </div>
      </div>

      {/* よくある質問・対応 */}
      <div className="card">
        <h3 className="card-title">よくある質問・対応</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="faq-item faq-blue">
            <span className="faq-title" style={{ color: '#1e3a8a' }}>保冷剤について</span>
            <p className="faq-text">「保冷剤は2時間ほど持ちます」と案内する。それ以上の場合は保冷バッグ等の確認。</p>
          </div>
          <div className="faq-item faq-red">
            <span className="faq-title" style={{ color: '#7f1d1d' }}>アレルギー対応</span>
            <p className="faq-text">「同じ製造ラインで作っているため微量混入の可能性があります。アレルギーをお持ちの方はご購入をお控えください」と伝える。</p>
          </div>
          <div className="faq-item faq-green">
            <span className="faq-title" style={{ color: '#14532d' }}>複数箱の対応</span>
            <p className="faq-text">分けて入れる可能性がある場合は「おまとめしてよろしいでしょうか」と必ず聞く。</p>
          </div>
          <div className="faq-item faq-orange">
            <span className="faq-title" style={{ color: '#7c2d12' }}>放置厳禁</span>
            <p className="faq-text">焼き菓子などを受け取ったまま放置しない。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatisserieApp;