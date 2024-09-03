## Clean Architecture

O Clean Architecture é um padrão arquitetural proposto por Robert C. Martin (também conhecido como Uncle Bob) que visa criar sistemas de software que sejam flexíveis, escaláveis, testáveis e de fácil manutenção. A ideia central é organizar o código de maneira que as regras de negócios e os detalhes de implementação sejam separados de forma clara e independente, promovendo uma arquitetura desacoplada e centrada no domínio do problema.

### Princípios Fundamentais do Clean Architecture

* **Independência da estrutura da aplicação:** A arquitetura não deve depender de detalhes de implementação, como frameworks, bancos de dados ou interfaces de usuário. O código deve ser capaz de ser testado sem precisar desses componentes.

* **Independência do banco de dados:** A lógica de negócio não deve estar diretamente acoplada ao banco de dados. Isso permite que o sistema possa mudar de banco de dados sem impacto significativo na lógica de negócio.

* **Independência do framework:** Os frameworks são ferramentas que ajudam a implementar o sistema, mas não devem ditar sua estrutura. Eles devem ser tratados como detalhes de implementação, substituíveis e não essenciais para a lógica de negócios.

* **Testabilidade:** A separação de preocupações permite que diferentes partes do sistema sejam testadas isoladamente, sem dependências externas, tornando o teste mais rápido e mais confiável.
