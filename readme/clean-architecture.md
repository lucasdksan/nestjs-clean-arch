## Clean Architecture

O Clean Architecture é um padrão arquitetural proposto por Robert C. Martin (também conhecido como Uncle Bob) que visa criar sistemas de software que sejam flexíveis, escaláveis, testáveis e de fácil manutenção. A ideia central é organizar o código de maneira que as regras de negócios e os detalhes de implementação sejam separados de forma clara e independente, promovendo uma arquitetura desacoplada e centrada no domínio do problema.

![Clean Architecture](/github/CleanArchitecture.jpg)

### Princípios Fundamentais do Clean Architecture

* **Independência da estrutura da aplicação:** A arquitetura não deve depender de detalhes de implementação, como frameworks, bancos de dados ou interfaces de usuário. O código deve ser capaz de ser testado sem precisar desses componentes.

* **Independência do banco de dados:** A lógica de negócio não deve estar diretamente acoplada ao banco de dados. Isso permite que o sistema possa mudar de banco de dados sem impacto significativo na lógica de negócio.

* **Independência do framework:** Os frameworks são ferramentas que ajudam a implementar o sistema, mas não devem ditar sua estrutura. Eles devem ser tratados como detalhes de implementação, substituíveis e não essenciais para a lógica de negócios.

* **Testabilidade:** A separação de preocupações permite que diferentes partes do sistema sejam testadas isoladamente, sem dependências externas, tornando o teste mais rápido e mais confiável.

A separação de camadas poupará o desenvolvedor de muitos problemas futuros com a manutenção do software, a regra de dependência bem aplicada deixará seu sistema completamente testável. Quando um framework, um banco de dados, ou uma API se tornar obsoleta a substituição de uma camada não será uma dor de cabeça, além de garantir a integridade do core do projeto.

### Estrutura do Clean Architecture

A Clean Architecture é frequentemente representada como uma série de círculos concêntricos, cada um representando diferentes camadas de abstração:

1. **Entities (Entidades):** Esta é a camada mais interna e representa as regras de negócio mais gerais. As entidades são objetos de negócio que são independentes de quaisquer outras camadas. Elas contêm a lógica central que é independente de frameworks, bancos de dados ou interfaces de usuário.

2. **Use Cases (Casos de Uso):** A camada de casos de uso contém a lógica específica da aplicação que coordena o comportamento das entidades para responder às ações do usuário. Ela orquestra o fluxo de dados para e das entidades, e também é independente de outras camadas.

3. **Interface Adapters (Adaptadores de Interface):** Esta camada contém adaptadores que convertem dados de um formato para outro, para que as camadas internas e externas possam se comunicar. Isso inclui controladores MVC, gateways de banco de dados (repositórios), serviços externos, entre outros.

4. **Frameworks and Drivers (Frameworks e Drivers):** Esta é a camada mais externa, contendo todos os detalhes específicos da implementação, como frameworks, drivers de banco de dados, interfaces de usuário e outros detalhes de infraestrutura. Esta camada é essencialmente um detalhe de implementação, que pode ser substituída sem afetar as camadas internas.
