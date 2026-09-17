/* eslint-disable @next/next/no-img-element */
'use client';

// =====================================================================================
// কুমড়ো পটাস (Kumro Potash) — Product Catalog Demo
// Next.js App Router page component. Drop this in as `app/page.jsx`.
//
// Fonts: uses next/font/google for two Bengali-friendly typefaces —
//   - Baloo Da 2   → headings (rounded, warm, handcrafted personality)
//   - Hind Siliguri → body copy (clean, highly legible in Bangla + Latin)
// Both are already added below via next/font, no extra <link> tags needed.
//
// Images: every product's `image` field is a placehold.co URL so the layout
// renders immediately. Swap each `image` value for your real product photo URL
// (or a local /public path) — nothing else needs to change.
//
// Contact links: update `WHATSAPP_NUMBER` and `MESSENGER_USERNAME` below with
// your real business numbers/handles before shipping.
// =====================================================================================

import { useState } from 'react';
import { Baloo_Da_2, Hind_Siliguri } from 'next/font/google';
import {
  MessageCircle,
  Menu,
  X,
  ShoppingBag,
  Sparkles,
  Plus,
  Minus,
} from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const display = Baloo_Da_2({
  subsets: ['bengali', 'latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
});

const body = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

// ---- Business contact details — replace with your real ones ----
const WHATSAPP_NUMBER = '8801XXXXXXXXX'; // no + or leading zeros dropped
const MESSENGER_USERNAME = 'kumropotash';
const INSTAGRAM_USERNAME = 'kumropotash';

// ---- Category taxonomy ----
const CATEGORIES = [
  { id: 'all', label: 'সব পণ্য', labelEn: 'All Products' },
  { id: 'bangles', label: 'চুড়ি', labelEn: 'Bangles' },
  { id: 'earrings', label: 'কানের দুল', labelEn: 'Earrings' },
  { id: 'hair', label: 'হেয়ার এক্সসেসরিজ', labelEn: 'Hair Accessories' },
];

// ---- Mock product data ----
const PRODUCTS = [
  {
    id: 1,
    name: 'সোনালী পাতা চুড়ি',
    nameEn: 'Golden Leaf Bangles',
    category: 'bangles',
    price: 650,
    image: 'https://i.ibb.co.com/PG8d1mgy/743203877-122197825226887413-30532701188516768-n.jpg',
  },
  {
    id: 2,
    name: 'মাটির রঙ চুড়ি সেট',
    nameEn: 'Terracotta Tone Bangle Set',
    category: 'bangles',
    price: 780,
    image: 'https://i.ibb.co.com/6Rcbn7HD/727446458-122195271266887413-8328077063363875741-n.jpg',
  },
  {
    id: 3,
    name: 'পটল পাতা কানের দুল',
    nameEn: 'Potol Leaf Earrings',
    category: 'earrings',
    price: 450,
    image: 'https://i.ibb.co.com/Tns26L2/777825407-122202545894887413-3877713639657508145-n.jpg',
  },
  {
    id: 4,
    name: 'ঝুমকো রূপালী দুল',
    nameEn: 'Jhumko Silver Drop Earrings',
    category: 'earrings',
    price: 520,
    image: 'https://i.ibb.co.com/DfBDwcbB/780097088-122202545882887413-7678433486937592745-n.jpg',
  },
  {
    id: 5,
    name: 'ফুলেল খোঁপার কাঁটা',
    nameEn: 'Floral Bun Pin',
    category: 'hair',
    price: 290,
    image: 'https://i.ibb.co.com/PZVKpVvC/789216647-122204199194887413-4846429130502667297-n.jpg',
  },
  {
    id: 6,
    name: 'পলাশ রঙা হেয়ার ক্লিপ',
    nameEn: 'Palash-hued Hair Clip',
    category: 'hair',
    price: 340,
    image: 'https://i.ibb.co.com/PZVKpVvC/789216647-122204199194887413-4846429130502667297-n.jpg',
  },
];

function whatsappLink(product) {
  const message = `আসসালামু আলাইকুম! আমি "${product.name}" (৳${product.price}) পণ্যটি সম্পর্কে জানতে চাই।`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function categoryLabel(id) {
  const found = CATEGORIES.find((c) => c.id === id);
  return found ? found.label : '';
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });

  const openOrderModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setCustomer({ name: '', phone: '', address: '' });
  };

  const closeOrderModal = () => {
    setSelectedProduct(null);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const total = selectedProduct.price * quantity;
    const message = `🛍️ *নতুন অর্ডার রিকোয়েস্ট (New Order Request)*

📦 *পণ্যের বিবরণ (Product Details):*
• পণ্য: ${selectedProduct.name} (${selectedProduct.nameEn})
• ক্যাটাগরি: ${categoryLabel(selectedProduct.category)}
• একক মূল্য: ৳${selectedProduct.price}
• পরিমাণ: ${quantity} টি
• সর্বমোট মূল্য: ৳${total}

👤 *গ্রাহকের তথ্য (Customer Details):*
• নাম: ${customer.name}
• মোবাইল নম্বর: ${customer.phone}
• পূর্ণাঙ্গ ঠিকানা: ${customer.address}

অনুগ্রহ করে অর্ডারটি নিশ্চিত করুন। ধন্যবাদ!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    closeOrderModal();
  };

  const filteredProducts =
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen bg-[#FBF3E9] font-[family-name:var(--font-body)] text-stone-800`}
    >
      {/* ===================== Header ===================== */}
      <header className="sticky top-0 z-40 border-b border-orange-100 bg-[#FBF3E9]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-sm shadow-orange-200">
              <Sparkles size={18} />
            </span>
            <div className="leading-tight">
              <h1 className="font-[family-name:var(--font-display)] text-xl font-bold text-orange-800 sm:text-2xl">
                কুমড়ো পটাস
              </h1>
              <p className="text-xs text-stone-500 sm:text-sm">
                নিপুণ হাতের কারুশৈলী
              </p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#products" className="text-sm font-bold text-stone-600 border-b-2 border-orange-500 transition hover:text-orange-700">
              All Products
            </a>
            <a href="#footer" className="text-sm font-bold text-stone-600 border-b-2 border-orange-500 transition hover:text-orange-700">
              contact
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              <MessageCircle size={16} />
              অর্ডার করুন
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg p-2 text-stone-700 hover:bg-orange-100 md:hidden"
            aria-label="মেনু খুলুন"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile nav panel */}
        {menuOpen && (
          <div className="border-t border-orange-100 bg-[#FBF3E9] px-5 pb-5 pt-3 md:hidden">
            <a
              href="#products"
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-700"
            >
              All Products
            </a>
            <a
              href="#footer"
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-700"
            >
              যোগাযোগ করুন
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white"
            >
              <MessageCircle size={16} />
              হোয়াটসঅ্যাপে অর্ডার করুন
            </a>
          </div>
        )}
      </header>

      {/* ===================== Hero ===================== */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-orange-700">
              সম্পূর্ণ হাতে তৈরি গয়না
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.15] text-stone-900 sm:text-5xl">
              আপনার সাজে
              <br />
              <span className="text-orange-600">দেশীয় ছোঁয়া</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-stone-600">
              চুড়ি, কানের দুল আর খোঁপার সাজ — প্রতিটি গয়না তৈরি হয় যত্ন নিয়ে,
              হাতে হাতে। মাটির কাছাকাছি রঙ আর নকশায় সাজুন প্রতিদিন।
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-orange-200 transition hover:bg-orange-600"
              >
                All Products
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-orange-300 bg-white px-6 py-3 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
              >
                <MessageCircle size={16} />
                সরাসরি জিজ্ঞাসা করুন
              </a>
            </div>
          </div>

          {/* Showcase collage */}
          <div className="relative mx-auto grid w-full max-w-sm grid-cols-2 gap-4">
            <div className="col-span-2 overflow-hidden rounded-3xl border border-orange-100 shadow-lg shadow-orange-100">
              <img
                src="https://i.ibb.co.com/PG8d1mgy/743203877-122197825226887413-30532701188516768-n.jpg"
                alt="হাতে তৈরি চুড়ির প্রদর্শনী"
                className="h-44 w-full object-cover sm:h-52"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-orange-100 shadow-md shadow-orange-100">
              <img
                src="https://i.ibb.co.com/Tns26L2/777825407-122202545894887413-3877713639657508145-n.jpg"
                alt="কানের দুলের প্রদর্শনী"
                className="h-32 w-full object-cover sm:h-36"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-orange-100 shadow-md shadow-orange-100">
              <img
                src="https://i.ibb.co.com/wjf6hD1/792882448-122204440178887413-7290368599261771530-n.jpg"
                alt="চুলের গয়নার প্রদর্শনী"
                className="h-32 w-full object-cover sm:h-36"
              />
            </div>

            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-orange-700 shadow-md shadow-orange-100">
              🪔 নতুন কালেকশন এসেছে
            </span>
          </div>
        </div>
      </section>

      {/* ===================== Category filters + product grid ===================== */}
      <section id="products" className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-stone-900 sm:text-3xl">
            আমাদের সংগ্রহ
          </h3>
          <p className="text-sm text-stone-500 sm:text-base">
            পছন্দের ধরন বেছে নিন, তারপর সরাসরি অর্ডার করুন
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-10 flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${isActive
                  ? 'border-orange-500 bg-orange-500 text-white shadow-sm shadow-orange-200'
                  : 'border-orange-200 bg-white text-stone-600 hover:border-orange-300 hover:bg-orange-50'
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm shadow-orange-100/60 transition hover:shadow-md hover:shadow-orange-200/60"
            >
              <div className="relative aspect-square overflow-hidden bg-orange-50">
                <img
                  src={product.image}
                  alt={product.nameEn}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-orange-700 shadow-sm">
                  {categoryLabel(product.category)}
                </span>
              </div>

              <div className="p-4 sm:p-5">
                <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
                  {product.name}
                </h4>
                <p className="mt-0.5 text-xs text-stone-400">{product.nameEn}</p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-700">
                    ৳{product.price.toLocaleString('bn-BD')}
                  </span>

                  <button
                    type="button"
                    onClick={() => openOrderModal(product)}
                    className="flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-orange-200 transition hover:bg-orange-600 active:scale-95"
                  >
                    <ShoppingBag size={14} />
                    অর্ডার
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="py-16 text-center text-sm text-stone-500">
            এই ক্যাটাগরিতে এখনো কোনো পণ্য যোগ করা হয়নি।
          </p>
        )}
      </section>

      {/* ===================== Footer ===================== */}
      <footer id="footer" className="border-t border-orange-100 bg-[#FBEEDF]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white">
                  <ShoppingBag size={16} />
                </span>
                <span className="font-[family-name:var(--font-display)] text-lg font-bold text-orange-800">
                  কুমড়ো পটাস
                </span>
              </div>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-600">
                হাতে তৈরি চুড়ি, কানের দুল আর চুলের গয়না — যত্ন করে বানানো,
                আপনার জন্য।
              </p>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-stone-800">All Products</h5>
              <ul className="mt-3 space-y-2 text-sm text-stone-600">
                {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        setActiveCategory(cat.id);
                        document
                          .getElementById('products')
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="transition hover:text-orange-700"
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-stone-800">যোগাযোগ</h5>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-orange-600 shadow-sm transition hover:bg-orange-100"
                >
                  <MessageCircle size={16} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61576622415632"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Messenger"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-orange-600 shadow-sm transition hover:bg-orange-100"
                >
                  <FaFacebook size={16} />
                </a>
                <a
                  href="https://www.instagram.com/kumro_.potash._?fbclid=IwY2xjawUYePFwZG9mAWV4dG4DYWVtAjEwAGJyaWQRMWtIUVNIRnpJSGgyWGZpWWhzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeFhDIAEFU8u8a908qRVyIyarQZZzPvq9vUzcfKyV5bVrofRVaCI7ovK80tCo_aem_iWxaQWobU2rU5pVoPPMgQg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-orange-600 shadow-sm transition hover:bg-orange-100"
                >
                  <FaInstagram size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-orange-200/70 pt-6 text-xs text-stone-500 sm:flex-row">
            <p>© {new Date().getFullYear()} কুমড়ো পটাস। সর্বস্বত্ব সংরক্ষিত।</p>
            <p>ভালোবাসা দিয়ে তৈরি, ঘরে ঘরে পৌঁছে দেওয়া হয়</p>
          </div>
        </div>
      </footer>

      {/* ===================== Checkout / Product Detail Modal ===================== */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all animate-in fade-in duration-200"
          onClick={closeOrderModal}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-orange-100 bg-[#FDFBF7] p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeOrderModal}
              className="absolute right-4 top-4 rounded-full p-2 text-stone-400 transition hover:bg-orange-100 hover:text-stone-700"
              aria-label="বন্ধ করুন"
            >
              <X size={20} />
            </button>

            {/* Modal Title */}
            <div className="mb-6 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <ShoppingBag size={18} />
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-stone-900 sm:text-2xl">
                  অর্ডার বিবরণ ও চেকআউট
                </h3>
                <p className="text-xs text-stone-500">আপনার তথ্য প্রদান করে সরাসরি অর্ডার সম্পন্ন করুন</p>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-orange-50 sm:h-32 sm:w-32">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.nameEn}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-1.5 top-1.5 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-orange-700 shadow-sm">
                  {categoryLabel(selectedProduct.category)}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-stone-900">
                    {selectedProduct.name}
                  </h4>
                  <p className="text-xs text-stone-400">{selectedProduct.nameEn}</p>
                  <p className="mt-1 text-sm font-bold text-orange-700">
                    একক মূল্য: ৳{selectedProduct.price.toLocaleString('bn-BD')}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2">
                  <span className="text-xs font-medium text-stone-600">পরিমাণ (Quantity):</span>
                  <div className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/60 px-2 py-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-stone-700 shadow-sm transition hover:bg-orange-100 disabled:opacity-40"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-stone-800">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-stone-700 shadow-sm transition hover:bg-orange-100"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Price Bar */}
            <div className="mb-5 flex items-center justify-between rounded-xl bg-orange-100/60 px-4 py-3">
              <span className="text-sm font-semibold text-stone-700">সর্বমোট মূল্য (Total Amount):</span>
              <span className="text-xl font-extrabold text-orange-800">
                ৳{(selectedProduct.price * quantity).toLocaleString('bn-BD')}
              </span>
            </div>

            {/* Customer Information Form */}
            <form onSubmit={handleConfirmOrder} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-stone-700">
                  নাম (Customer Name) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="আপনার পূর্ণ নাম লিখুন"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full rounded-xl border border-orange-200 bg-white px-3.5 py-2.5 text-sm text-stone-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-stone-700">
                  মোবাইল নম্বর (Mobile Number) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="০১XXXXXXXXX"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full rounded-xl border border-orange-200 bg-white px-3.5 py-2.5 text-sm text-stone-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-stone-700">
                  পূর্ণাঙ্গ ঠিকানা (Full Delivery Address) <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="বাড়ি নং, রোড, থানা, জেলা"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full rounded-xl border border-orange-200 bg-white px-3.5 py-2.5 text-sm text-stone-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              {/* Modal Actions */}
              <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeOrderModal}
                  className="rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-50"
                >
                  বাতিল করুন (Close)
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600"
                >
                  <MessageCircle size={16} />
                  অর্ডার নিশ্চিত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
