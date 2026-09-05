import os

components = {
    "Form Elements": [
        "text-input", "number-input", "textarea", "checkbox", "radio", "select", 
        "datepicker", "range-slider", "color-picker", "file-upload", "toggle-switch", "datalist"
    ],
    "Data Display": [
        "table", "list", "badge", "tag", "avatar", "card", "timeline"
    ],
    "Layout": [
        "accordion", "tabs", "divider", "fieldset", "stepper", "grid"
    ],
    "Feedback": [
        "progress", "meter", "alert", "skeleton", "spinner"
    ],
    "Overlay Interactive": [
        "dialog", "tooltip", "popover", "dropdown-menu"
    ],
    "Navigation": [
        "breadcrumb", "pagination", "toolbar", "menu"
    ],
    "Buttons": [
        "button", "button-group", "icon-button"
    ]
}

base_path = "/home/fuchik0ma/code/nx-microfrontends/apps/mfe-native/src/app/showcase"
os.makedirs(base_path, exist_ok=True)

routes_content = "import { Route } from '@angular/router';\n\nexport const appRoutes: Route[] = [\n"
routes_content += "  {\n    path: '',\n    loadComponent: () => import('./showcase/list-page').then(m => m.ListPageComponent)\n  },\n"

list_html_links = []

for category, comps in components.items():
    list_html_links.append(f'<h2 class="text-xl font-bold mt-6 mb-4">{category}</h2>')
    list_html_links.append('<div class="grid grid-cols-2 md:grid-cols-3 gap-4">')
    for comp in comps:
        comp_dir = os.path.join(base_path, comp)
        os.makedirs(comp_dir, exist_ok=True)
        
        class_name = "".join([part.capitalize() for part in comp.split("-")]) + "Component"
        
        comp_code = f"""import {{ ChangeDetectionStrategy, Component }} from '@angular/core';

@Component({{
  selector: 'app-{comp}',
  standalone: true,
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">{comp} Showcase</h1>
      <p class="mb-8 text-gray-600">Native HTML {comp} element styled with Tailwind CSS.</p>
      
      <div class="p-6 border rounded-lg bg-white shadow-sm">
        <!-- Add specific {comp} HTML here -->
        <div>Placeholder for {comp}</div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
}})
export class {class_name} {{}}
"""
        if comp == "table":
            comp_code = f"""import {{ ChangeDetectionStrategy, Component, signal, computed }} from '@angular/core';

@Component({{
  selector: 'app-table',
  standalone: true,
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Table Showcase</h1>
      <p class="mb-8 text-gray-600">Native HTML table element styled with Tailwind CSS.</p>
      
      <div class="p-6 border rounded-lg bg-white shadow-sm overflow-x-auto">
        <div class="mb-4 flex justify-between">
            <input type="text" placeholder="Search..." class="border rounded px-3 py-2" (input)="updateSearch($event)" />
        </div>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th (click)="setSort('id')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">ID</th>
              <th (click)="setSort('name')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">Name</th>
              <th (click)="setSort('status')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            @for (row of paginatedData(); track row.id) {{
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{{{ row.id }}}}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{{{ row.name }}}}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                        [class.bg-green-100]="row.status === 'Active'" 
                        [class.text-green-800]="row.status === 'Active'"
                        [class.bg-red-100]="row.status === 'Inactive'" 
                        [class.text-red-800]="row.status === 'Inactive'">
                    {{{{ row.status }}}}
                  </span>
                </td>
              </tr>
            }}
          </tbody>
        </table>
        
        <div class="mt-4 flex items-center justify-between">
          <div>Showing {{{{ (currentPage() - 1) * pageSize + 1 }}}} to {{{{ Math.min(currentPage() * pageSize, filteredData().length) }}}} of {{{{ filteredData().length }}}} entries</div>
          <div class="flex gap-2">
            <button [disabled]="currentPage() === 1" (click)="currentPage.set(currentPage() - 1)" class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">Previous</button>
            <button [disabled]="currentPage() * pageSize >= filteredData().length" (click)="currentPage.set(currentPage() + 1)" class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
}})
export class TableComponent {{
  Math = Math;
  
  rawData = Array.from({{ length: 100 }}, (_, i) => ({{
    id: i + 1,
    name: `User ${{i + 1}}`,
    status: i % 3 === 0 ? 'Inactive' : 'Active'
  }}));
  
  searchQuery = signal('');
  sortKey = signal<keyof any>('id');
  sortDesc = signal(false);
  currentPage = signal(1);
  pageSize = 10;
  
  updateSearch(e: Event) {{
    this.searchQuery.set((e.target as HTMLInputElement).value);
    this.currentPage.set(1);
  }}
  
  setSort(key: keyof any) {{
    if (this.sortKey() === key) {{
      this.sortDesc.set(!this.sortDesc());
    }} else {{
      this.sortKey.set(key);
      this.sortDesc.set(false);
    }}
  }}
  
  filteredData = computed(() => {{
    let data = this.rawData;
    const query = this.searchQuery().toLowerCase();
    if (query) {{
      data = data.filter(item => item.name.toLowerCase().includes(query) || item.id.toString().includes(query));
    }}
    
    const key = this.sortKey();
    const desc = this.sortDesc();
    
    return data.sort((a, b) => {{
      if (a[key] < b[key]) return desc ? 1 : -1;
      if (a[key] > b[key]) return desc ? -1 : 1;
      return 0;
    }});
  }});
  
  paginatedData = computed(() => {{
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredData().slice(start, start + this.pageSize);
  }});
}}
"""

        with open(os.path.join(comp_dir, "index.ts"), "w") as f:
            f.write(comp_code)
            
        routes_content += f"  {{\n    path: '{comp}',\n    loadComponent: () => import('./showcase/{comp}').then(m => m.{class_name})\n  }},\n"
        list_html_links.append(f'      <a routerLink="/{comp}" class="block p-4 border rounded shadow-sm hover:shadow-md hover:border-blue-500 transition-colors bg-white">\n        <div class="font-medium text-lg">{comp}</div>\n      </a>')
    list_html_links.append('</div>')

routes_content += "];\n"

with open("/home/fuchik0ma/code/nx-microfrontends/apps/mfe-native/src/app/app.routes.ts", "w") as f:
    f.write(routes_content)

list_html_content = "\n".join(list_html_links)
list_comp_code = f"""import {{ ChangeDetectionStrategy, Component }} from '@angular/core';
import {{ RouterModule }} from '@angular/router';

@Component({{
  selector: 'app-list-page',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-extrabold mb-2 text-gray-900">Native HTML Showcases</h1>
      <p class="text-gray-600 mb-8">A collection of native HTML elements styled exclusively with Tailwind CSS.</p>
      
      {list_html_content}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
}})
export class ListPageComponent {{}}
"""

os.makedirs(os.path.join(base_path, "list-page"), exist_ok=True)
with open(os.path.join(base_path, "list-page", "index.ts"), "w") as f:
    f.write(list_comp_code)

