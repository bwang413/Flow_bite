'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { HiMenuAlt1, HiX } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { Banner } from '~/components/banner';
import { DocSearchInput } from '~/components/docsearch-input';
import { NavbarIcons, NavbarLinks } from '~/components/navbar';
import { DOCS_SIDEBAR, type DocsSidebarItem } from '~/data/docs-sidebar';
import { Accordion, Badge, Navbar, Sidebar } from '~/src';
import { isClient } from '~/src/helpers/is-client';

import '~/styles/docs.css';

interface DocsLayoutState {
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function DocsLayout({ children }: PropsWithChildren) {
  const [isCollapsed, setCollapsed] = useState(true);

  const state: DocsLayoutState = {
    isCollapsed,
    setCollapsed,
  };

  return (
    <div className="w-full min-w-0 flex-auto">
      <div className="relative bg-white text-gray-600 antialiased dark:bg-gray-900 dark:text-gray-400">
        <Banner />
        <DocsNavbar {...state} />
        <div className="lg:flex">
          <DocsSidebar {...state} />
          <div className="w-full min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

function DocsNavbar({ isCollapsed, setCollapsed }: DocsLayoutState) {
  return (
    <Navbar
      fluid
      theme={{
        root: {
          base: 'sticky top-0 z-[60] bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between w-full mx-auto py-2.5 px-4',
          inner: {
            base: 'mx-auto flex flex-wrap justify-between items-center w-full',
          },
        },
      }}
    >
      <div className="flex items-center">
        {isCollapsed ? (
          <button
            type="button"
            className="-ml-3 mr-1 p-2 lg:ml-0 lg:mr-0 lg:hidden"
            onClick={() => setCollapsed(!isCollapsed)}
          >
            <HiMenuAlt1 aria-label="Open sidebar" className="h-6 w-6 cursor-pointer text-gray-600 dark:text-gray-300" />
          </button>
        ) : (
          <button
            type="button"
            className="-ml-3 mr-1 rounded p-2 dark:bg-gray-700 lg:ml-0 lg:mr-0 lg:hidden"
            onClick={() => setCollapsed(!isCollapsed)}
          >
            <HiX aria-label="Close sidebar" className="h-6 w-6 cursor-pointer text-gray-600 dark:text-gray-300" />
          </button>
        )}
        <Link href="/" className="sr-only">
          Flowbite React
        </Link>
        <Link
          aria-hidden
          href="/"
          className="flex items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image alt="" height={32} src="/favicon.svg" width={32} className="h-8 w-8" />
          <span>Flowbite React</span>
        </Link>
        <div className="ml-4 hidden lg:flex">
          <DocSearchInput />
        </div>
      </div>
      <div className="flex items-center">
        <NavbarLinks />
        <NavbarIcons />
      </div>
    </Navbar>
  );
}

function DocsSidebar({ isCollapsed, setCollapsed }: DocsLayoutState) {
  const pathname = usePathname();

  // collapse sidebar on small screens when navigating to a new page
  useEffect(() => {
    if (isClient() && window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, [pathname, setCollapsed]);

  return (
    <>
      <div
        className={twMerge(
          'fixed inset-0 z-50 h-full w-64 flex-none border-r border-gray-200 dark:border-gray-600 lg:static lg:block lg:h-auto lg:overflow-y-visible lg:pt-6',
          isCollapsed && 'hidden',
        )}
      >
        <Sidebar
          theme={{
            root: {
              base: 'h-full border-r border-gray-200 dark:border-gray-600',
              inner:
                'overflow-y-auto px-4 pt-20 lg:pt-0 h-full bg-white scrolling-touch max-w-2xs lg:h-[calc(100vh-8rem)] lg:block dark:bg-gray-900 lg:mr-0 lg:sticky top-20 font-normal text-base lg:text-sm',
            },
          }}
        >
          <Sidebar.Items className="grid grid-cols-1 gap-2">
            <Accordion collapseAll={!pathname.includes('/getting-started/')} flush className="border-none">
              <Accordion.Panel>
                <Accordion.Title
                  theme={{
                    open: {
                      on: 'mb-2 text-primary-700 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-500',
                      off: 'mb-1 text-gray-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-500',
                    },
                  }}
                  className={twMerge(
                    'flex w-full items-center justify-between bg-transparent p-0 text-sm font-semibold uppercase tracking-wide',
                    pathname.includes('/getting-started/') &&
                      'text-primary-700 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-500',
                  )}
                >
                  Getting started
                </Accordion.Title>
                <Accordion.Content className="mb-2 border-none p-0">
                  <Sidebar.ItemGroup className="border-none">
                    <SidebarLink href="/docs/getting-started/introduction">Introduction</SidebarLink>
                    <SidebarLink href="/docs/getting-started/quickstart">Quickstart</SidebarLink>
                    <SidebarLink href="/docs/getting-started/nextjs">
                      <span className="flex items-center gap-2">
                        Next.js{' '}
                        <Badge color="cyan" className="px-2">
                          New
                        </Badge>
                      </span>
                    </SidebarLink>
                    <SidebarLink href="/docs/getting-started/typescript">TypeScript</SidebarLink>
                    <SidebarLink href="/docs/getting-started/license">License</SidebarLink>
                    <SidebarLink href="https://github.com/themesberg/flowbite-react/releases">Changelog</SidebarLink>
                    <SidebarLink href="/docs/getting-started/contributing">Contributing</SidebarLink>
                  </Sidebar.ItemGroup>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
            <Accordion collapseAll={!pathname.includes('/customize/')} flush className="border-none">
              <Accordion.Panel>
                <Accordion.Title
                  theme={{
                    open: {
                      on: 'mb-2 text-primary-700 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-500',
                      off: 'mb-1 text-gray-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-500',
                    },
                  }}
                  className={twMerge(
                    'flex w-full items-center justify-between bg-transparent p-0 text-sm font-semibold uppercase tracking-wide',
                    pathname.includes('/customize/') &&
                      'text-primary-700 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-500',
                  )}
                >
                  Customize
                </Accordion.Title>
                <Accordion.Content className="mb-2 space-y-0.5 border-none p-0">
                  <Sidebar.ItemGroup className="border-none">
                    <SidebarLink href="/docs/customize/theme">Theme</SidebarLink>
                    <SidebarLink href="/docs/customize/dark-mode">Dark mode</SidebarLink>
                  </Sidebar.ItemGroup>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
            <Accordion collapseAll={!pathname.includes('/components/')} flush className="border-none">
              <Accordion.Panel className="focus:outline-none focus:ring-0">
                <Accordion.Title
                  theme={{
                    open: {
                      on: 'mb-2 text-primary-700 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-500',
                      off: 'mb-1 text-gray-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-500',
                    },
                  }}
                  className={twMerge(
                    'flex w-full items-center justify-between bg-transparent p-0 text-sm font-semibold uppercase tracking-wide',
                    pathname.includes('/components/') &&
                      'text-primary-700 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-500',
                  )}
                >
                  Components
                </Accordion.Title>
                <Accordion.Content className="mb-2 border-none p-0">
                  <Sidebar.ItemGroup className="border-none">
                    <SidebarLink href="/docs/components/accordion">Accordion</SidebarLink>
                    <SidebarLink href="/docs/components/alert">Alert</SidebarLink>
                    <SidebarLink href="/docs/components/avatar">Avatar</SidebarLink>
                    <SidebarLink href="/docs/components/badge">Badge</SidebarLink>
                    <SidebarLink href="/docs/components/banner">
                      <span className="flex items-center gap-2">
                        Banner{' '}
                        <Badge color="cyan" className="px-2">
                          New
                        </Badge>
                      </span>
                    </SidebarLink>
                    <SidebarLink href="/docs/components/breadcrumb">Breadcrumb</SidebarLink>
                    <SidebarLink href="/docs/components/button">Button</SidebarLink>
                    <SidebarLink href="/docs/components/button-group">Button group</SidebarLink>
                    <SidebarLink href="/docs/components/card">Card</SidebarLink>
                    <SidebarLink href="/docs/components/carousel">Carousel</SidebarLink>
                    <SidebarLink href="/docs/components/datepicker">
                      <span className="flex items-center gap-2">
                        Datepicker{' '}
                        <Badge color="cyan" className="px-2">
                          New
                        </Badge>
                      </span>
                    </SidebarLink>
                    <SidebarLink href="/docs/components/dropdown">Dropdown</SidebarLink>
                    <SidebarLink href="/docs/components/footer">Footer</SidebarLink>
                    <SidebarLink href="/docs/components/forms">Forms</SidebarLink>
                    <SidebarLink href="/docs/components/kbd">
                      <span className="flex items-center gap-2">
                        KBD{' '}
                        <Badge color="cyan" className="px-2">
                          New
                        </Badge>
                      </span>
                    </SidebarLink>
                    <SidebarLink href="/docs/components/list-group">List group</SidebarLink>
                    <SidebarLink href="/docs/components/modal">Modal</SidebarLink>
                    <SidebarLink href="/docs/components/navbar">Navbar</SidebarLink>
                    <SidebarLink href="/docs/components/pagination">Pagination</SidebarLink>
                    <SidebarLink href="/docs/components/progress">Progress bar</SidebarLink>
                    <SidebarLink href="/docs/components/rating">Rating</SidebarLink>
                    <SidebarLink href="/docs/components/sidebar">Sidebar</SidebarLink>
                    <SidebarLink href="/docs/components/spinner">Spinner</SidebarLink>
                    <SidebarLink href="/docs/components/table">Table</SidebarLink>
                    <SidebarLink href="/docs/components/tabs">Tabs</SidebarLink>
                    <SidebarLink href="/docs/components/timeline">Timeline</SidebarLink>
                    <SidebarLink href="/docs/components/toast">Toast</SidebarLink>
                    <SidebarLink href="/docs/components/tooltip">Tooltip</SidebarLink>
                  </Sidebar.ItemGroup>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
            <Accordion collapseAll={!pathname.includes('/forms/')} flush className="border-none">
              <Accordion.Panel>
                <Accordion.Title
                  theme={{
                    open: {
                      on: 'mb-2 text-primary-700 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-500',
                      off: 'mb-1 text-gray-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-500',
                    },
                  }}
                  className={twMerge(
                    'flex w-full items-center justify-between bg-transparent p-0 text-sm font-semibold uppercase tracking-wide',
                    pathname.includes('/forms/') &&
                      'text-primary-700 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-500',
                  )}
                >
                  Forms
                </Accordion.Title>
                <Accordion.Content className="mb-2 border-none p-0">
                  <Sidebar.ItemGroup className="border-none">
                    <SidebarLink href="/docs/forms/floating-label">
                      <span className="flex items-center gap-2">
                        Floating Label{' '}
                        <Badge color="cyan" className="px-2">
                          New
                        </Badge>
                      </span>
                    </SidebarLink>
                  </Sidebar.ItemGroup>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>

            <Accordion collapseAll={!pathname.includes('/docs/typography/')} flush className="border-none">
              <Accordion.Panel>
                <Accordion.Title
                  theme={{
                    open: {
                      on: 'mb-2 text-primary-700 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-500',
                      off: 'mb-1 text-gray-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-500',
                    },
                  }}
                  className={twMerge(
                    'flex w-full items-center justify-between bg-transparent p-0 text-sm font-semibold uppercase tracking-wide',
                    pathname.includes('/docs/typography/') &&
                      'text-primary-700 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-500',
                  )}
                >
                  Typography
                </Accordion.Title>
                <Accordion.Content className="mb-2 space-y-0.5 border-none p-0">
                  <Sidebar.ItemGroup className="border-none">
                    <SidebarLink href="/docs/typography/blockquote">
                      <span className="flex items-center gap-2">
                        Blockquote{' '}
                        <Badge color="cyan" className="px-2">
                          New
                        </Badge>
                      </span>
                    </SidebarLink>
                    <SidebarLink href="/docs/typography/list">
                      <span className="flex items-center gap-2">
                        List{' '}
                        <Badge color="cyan" className="px-2">
                          New
                        </Badge>
                      </span>
                    </SidebarLink>
                  </Sidebar.ItemGroup>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
            <span className="h-64">&nbsp;</span>
            {DOCS_SIDEBAR.map((section) => (
              <SidebarSection key={section.title} title={section.title} href={section.href}>
                {section.items.map((item) => (
                  <SidebarItem key={`section-${section.title}_item-${item.title}`} {...item} />
                ))}
              </SidebarSection>
            ))}
          </Sidebar.Items>
        </Sidebar>
      </div>
      {!isCollapsed && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          onClick={() => setCollapsed(true)}
          onKeyUp={(key) => key.code === 'Escape' && setCollapsed(true)}
          className="fixed inset-0 z-40 bg-gray-900/50 dark:bg-gray-900/60 lg:hidden"
        />
      )}
    </>
  );
}

function SidebarSection({ title, href, children }: PropsWithChildren<{ title: string; href: string }>) {
  const pathname = usePathname();

  return (
    <Accordion className="border-none" collapseAll={!pathname.includes(href)} flush>
      <Accordion.Panel>
        <Accordion.Title
          theme={{
            open: {
              on: 'mb-2 text-primary-700 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-500',
              off: 'mb-1 text-gray-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-500',
            },
          }}
          className={twMerge(
            'flex w-full items-center justify-between bg-transparent p-0 text-sm font-semibold uppercase tracking-wide',
            pathname.includes(href) &&
              'text-primary-700 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-500',
          )}
        >
          {title}
        </Accordion.Title>
        <Accordion.Content className="mb-2 border-none p-0">
          <Sidebar.ItemGroup className="border-none">{children}</Sidebar.ItemGroup>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}

function SidebarItem({ title, href, isNew, isExternal }: DocsSidebarItem) {
  return (
    <SidebarLink href={href} isExternal={isExternal}>
      {isNew ? <NewBadge>{title}</NewBadge> : title}
    </SidebarLink>
  );
}

function SidebarLink({ children, href, isExternal }: PropsWithChildren<{ href: string; isExternal?: boolean }>) {
  const pathname = usePathname();

  return (
    <Sidebar.Item
      as={Link}
      href={href}
      target={isExternal && '_blank'}
      className={twMerge(
        'p-0 font-medium transition-all hover:bg-transparent dark:hover:bg-transparent lg:text-sm [&>*]:px-0',
        pathname === href
          ? 'text-primary-700 hover:text-primary-700 dark:text-primary-500'
          : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
      )}
    >
      {children}
    </Sidebar.Item>
  );
}

function NewBadge({ children }: PropsWithChildren) {
  return (
    <span className="flex items-center gap-2">
      {children}
      <Badge color="cyan" className="h-4 px-1.5">
        New
      </Badge>
    </span>
  );
}
