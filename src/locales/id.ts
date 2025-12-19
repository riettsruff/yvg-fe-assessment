import type { TranslationsSchema } from './types';

export const id = {
  common: {
    skipToMain: 'Loncat ke konten utama',
    brand: 'YVG Frontend Assessment',
    brandSubtitle: 'Dikembangkan oleh Rietts Andreas Ruff',
    footer: '© {year} YVG - Frontend Engineer Assessment',
    refreshing: 'Memuat ulang',
    back: 'Kembali',
    retry: 'Coba lagi',
    tryAgain: 'Coba lagi',
    loading: 'Memuat...',
    loadingAlt: 'Konten sedang dimuat, mohon tunggu',
    openMenu: 'Buka menu',
    closeMenu: 'Tutup menu',
    theme: {
      label: 'Ganti tema',
      light: 'tema terang',
      dark: 'tema gelap',
      toggle: 'Ganti ke {theme}',
      current: 'Tema saat ini: {theme}',
    },
    language: {
      label: 'Bahasa',
      current: 'Bahasa saat ini: {language}',
      en: 'English',
      id: 'Bahasa Indonesia',
      toggle: 'Ganti bahasa ke {language}',
    },
  },

  nav: {
    todos: {
      label: 'Tugas',
      description: 'Kelola pekerjaanmu',
    },
    posts: {
      label: 'Artikel',
      description: 'Jelajahi tulisan',
    },
  },

  todos: {
    title: 'Tugas Saya',
    subtitle: '{completed} dari {total} tugas selesai',
    subtitleEmpty: 'Belum ada tugas. Tambah dulu yuk!',
    progressLabel: 'Progress tugas: {percent}%',
    addPlaceholder: 'Apa yang perlu dikerjakan?',
    addButton: 'Tambah Tugas',
    addHint: 'Isi deskripsi tugas lalu tekan Tambah Tugas atau Enter untuk menyimpan',
    filters: {
      all: 'Semua',
      pending: 'Belum selesai',
      completed: 'Selesai',
    },
    emptyTitle: 'Belum ada tugas',
    emptyDescription: 'Buat tugas pertamamu di atas untuk mulai produktif',
    emptyFilterTitle: 'Tidak ada tugas cocok',
    emptyFilterDescription: 'Tidak ada tugas {filter}',
    countBadge: '{count}',
    keyboardHint: 'Klik lingkaran untuk menandai selesai. Arahkan kursor untuk hapus.',
    deleteAria: 'Hapus tugas: {text}',
    markComplete: 'Tandai "{text}" sebagai selesai',
    markIncomplete: 'Tandai "{text}" sebagai belum selesai',
  },

  posts: {
    title: 'Artikel',
    description: 'Jelajahi {count} artikel atau cari berdasarkan ID untuk melihat komentar',
    searchLabel: 'Cari artikel berdasarkan ID',
    searchPlaceholder: 'Cari ID artikel...',
    searchButton: 'Cari',
    searchHint: 'Masukkan angka {min}-{max} untuk menemukan artikel tertentu',
    emptyTitle: 'Tidak ada artikel',
    emptyDescription: 'Belum ada artikel tersedia',
    emptySearchDescription: 'Tidak ada artikel dengan ID berisi "{query}"',
    showingCount: 'Menampilkan {limit} dari {count} artikel. Gunakan pencarian untuk artikel lain.',
    retryLoad: 'Muat ulang artikel',
    ariaPost: 'Artikel {id}: {title}. Klik untuk melihat detail dan komentar',
  },

  postDetail: {
    loading: 'Memuat artikel...',
    invalidId: 'ID artikel tidak valid. Pilih ID yang sesuai.',
    error: 'Gagal memuat artikel',
    notFoundTitle: 'Artikel tidak ditemukan',
    notFoundDescription: 'Kami tidak menemukan artikel yang kamu cari.',
    postLabel: 'Artikel #{id}',
    postHeaderLabel: 'Artikel',
    comments: 'Komentar',
    commentsCount: '({count})',
    loadingComments: 'Memuat komentar...',
    commentsEmptyTitle: 'Belum ada komentar',
    commentsEmptyDescription: 'Artikel ini belum memiliki komentar',
    commentLabel: 'Komentar #{id}',
    back: 'Kembali',
  },

  notFoundPage: {
    title: 'Ups! Halaman tidak ditemukan',
    backHome: 'Kembali ke Beranda',
  },

  errorState: {
    title: 'Terjadi kesalahan',
    retryAria: 'Coba ulangi proses yang gagal',
  },
} as const satisfies TranslationsSchema;

export default id;
